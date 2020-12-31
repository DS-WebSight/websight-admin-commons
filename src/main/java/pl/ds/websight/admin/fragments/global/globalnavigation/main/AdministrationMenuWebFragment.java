package pl.ds.websight.admin.fragments.global.globalnavigation.main;

import org.apache.jackrabbit.api.security.user.Group;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.jcr.base.util.AccessControlUtil;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pl.ds.websight.fragments.registry.ConditionalWebFragment;
import pl.ds.websight.fragments.registry.WebFragment;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.Iterator;

@Component (service = WebFragment.class)
@Designate(ocd = AdministrationMenuWebFragmentConfig.class)
public class AdministrationMenuWebFragment implements ConditionalWebFragment {

    private static final Logger LOG = LoggerFactory.getLogger(AdministrationMenuWebFragment.class);

    private String[] restrictedGroups;

    @Activate
    private void init(AdministrationMenuWebFragmentConfig config) {
        restrictedGroups = config.restrictedGroups();
    }

    @Override
    public String getKey() {
        return "websight.global.global-navigation.main";
    }

    @Override
    public String getFragment() {
        return "/apps/websight-admin/web-resources/fragments/global/global-navigation/main/AdministrationFragment.js";
    }

    @Override
    public int getRanking() {
        return 200;
    }

    @Override
    public boolean isApplicable(SlingHttpServletRequest request) {
        ResourceResolver resourceResolver = request.getResourceResolver();
        try {
            UserManager userManager = AccessControlUtil.getUserManager(resourceResolver.adaptTo(Session.class));
            if (userManager != null) {
                User user = (User) userManager.getAuthorizable(resourceResolver.getUserID());
                if (user == null) {
                    LOG.warn("Failed to fetch user from request");
                    return false;
                }
                if (user.isAdmin()) {
                    return true;
                }

                Iterator<Group> groups = user.memberOf();
                while (groups.hasNext()) {
                    Group group = groups.next();
                    for (String restrictedGroup : restrictedGroups) {
                        if (group.getID().equals(restrictedGroup)) {
                            return false;
                        }
                    }
                }
            } else {
                LOG.error("Failed to obtain user manager from request. Unable to check if user belongs to restricted group");
            }
        } catch (RepositoryException e) {
            LOG.warn("Unable to check if user belongs to restricted group", e);
        }
        return true;
    }

}
