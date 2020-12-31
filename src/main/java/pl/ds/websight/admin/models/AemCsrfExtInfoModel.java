package pl.ds.websight.admin.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(adaptables = SlingHttpServletRequest.class)
public class AemCsrfExtInfoModel {
    private static final String CSRF_RESOURCE_NAME = "/apps/websight-rest-aem-csrf-ext/web-resources/CsrfHeaderExtender.js";

    @Inject
    @Source("sling-object")
    private ResourceResolver resourceResolver;
    private boolean aemCsrfTokenRequired = false;

    public boolean isAemCsrfTokenRequired() {
        return aemCsrfTokenRequired;
    }

    @PostConstruct
    public void init() {
        if (resourceResolver.getResource(CSRF_RESOURCE_NAME) != null) {
            this.aemCsrfTokenRequired = true;
        }
    }

}
