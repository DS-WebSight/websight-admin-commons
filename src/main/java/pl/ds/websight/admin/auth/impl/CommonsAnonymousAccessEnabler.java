package pl.ds.websight.admin.auth.impl;

import org.osgi.service.component.annotations.Component;
import pl.ds.websight.admin.auth.AnonymousAccessEnabler;

@Component(service = AnonymousAccessEnabler.class)
public class CommonsAnonymousAccessEnabler implements AnonymousAccessEnabler {

    @Override
    public String[] getPaths() {
        return new String[] { "/apps/websight-rest-framework", "/apps/websight-fragments-registry" };
    }
}
