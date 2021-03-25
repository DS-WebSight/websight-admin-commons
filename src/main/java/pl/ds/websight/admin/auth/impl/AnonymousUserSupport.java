package pl.ds.websight.admin.auth.impl;

import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.framework.InvalidSyntaxException;
import org.osgi.framework.ServiceReference;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.component.annotations.ReferencePolicy;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pl.ds.websight.admin.auth.AnonymousAccessEnabler;

import java.util.Arrays;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Enables easy way to turn on/off anonymous access to entries defined by {@link AnonymousAccessEnabler}. it leverages Sling Authenticator's ability
 * to define sling.auth.requirements properties of any osgi service. This class is a registration service that for each {@link AnonymousAccessEnabler}
 * creates dummy service with proper auth requirements.
 */
@Component(immediate = true)
@Designate(ocd = AnonymousUserSupport.AnonymousUserSupportConfiguration.class)
public class AnonymousUserSupport {

    private static final Logger LOG = LoggerFactory.getLogger(AnonymousUserSupport.class);

    private static final String NO_FILTER = null;

    private Map<Long, ServiceRegistration<SlingAuthRequirementsProvider>> authRequirementsRegistrationByServiceId = new HashMap<>();

    private BundleContext bundleContext;

    private boolean anonymousUserSupported = false;

    @Activate
    public void activate(AnonymousUserSupportConfiguration configuration, BundleContext bundleContext) {
        this.bundleContext = bundleContext;
        this.anonymousUserSupported = configuration.allow_anonymous_user();
        ServiceReference<?>[] anonymousAccessEnablerReferences = getAllServiceReferences(bundleContext, AnonymousAccessEnabler.class);
        for (ServiceReference<?> reference : anonymousAccessEnablerReferences) {
            try {
                AnonymousAccessEnabler anonymousAccessEnabler = (AnonymousAccessEnabler) bundleContext.getService(reference);
                if (anonymousUserSupported) {
                    registerSlingAuthRequirementsProvider(anonymousAccessEnabler, (Long) reference.getProperty(Constants.SERVICE_ID));
                } else {
                    unregisterAuthRequirementsProvider((Long) reference.getProperty(Constants.SERVICE_ID));
                }
            } catch (RuntimeException e) {
                LOG.error("Cannot register sling auth requirements provider.", e);
            }
        }
    }

    @Deactivate
    @SuppressWarnings("unused")
    private synchronized void deactivate() {
        this.bundleContext = null;
        // copy keys to avoid concurrent map modification
        Set<Long> servicesIds = new HashSet<>(authRequirementsRegistrationByServiceId.keySet());
        for (Long id : servicesIds) {
            unregisterAuthRequirementsProvider(id);
        }
    }

    @Reference(
            service = AnonymousAccessEnabler.class,
            cardinality = ReferenceCardinality.MULTIPLE,
            policy = ReferencePolicy.DYNAMIC)
    @SuppressWarnings("unused")
    private synchronized void bindAnonymousAccessEnabler(AnonymousAccessEnabler anonymousAccessEnabler, Map<String, ?> properties) {
        if (bundleContext != null) {
            registerSlingAuthRequirementsProvider(anonymousAccessEnabler, (Long) properties.get(Constants.SERVICE_ID));
        } else {
            LOG.info("Delegating action {} registration to activate method. Bundle context not ready yet.",
                    anonymousAccessEnabler.getClass());
        }
    }

    @SuppressWarnings("unused")
    private synchronized void unbindAnonymousAccessEnabler(AnonymousAccessEnabler anonymousAccessEnabler, Map<String, ?> properties) {
        unregisterAuthRequirementsProvider((Long) properties.get(Constants.SERVICE_ID));
    }

    private void registerSlingAuthRequirementsProvider(AnonymousAccessEnabler anonymousAccessEnabler,
            Long anonymousAccessEnablerServiceId) {
        if (!anonymousUserSupported) {
            LOG.debug(
                    "Anonymous users not supported skipping Sling Auth Requirements Provider registration for anonymous access enabler {} ",
                    anonymousAccessEnabler);
            return;
        }
        if (authRequirementsRegistrationByServiceId.containsKey(anonymousAccessEnablerServiceId)) {
            throw new IllegalStateException(
                    "Service already registered for anonymous access enabler service id " + anonymousAccessEnablerServiceId);
        }
        Dictionary<String, Object> properties = new Hashtable<>();
        properties.put("sling.auth.requirements", Arrays.stream(anonymousAccessEnabler.getPaths()).map(path -> "-" + path).collect(
                Collectors.toList()).toArray());
        ServiceRegistration<SlingAuthRequirementsProvider> service = bundleContext
                .registerService(SlingAuthRequirementsProvider.class, new SlingAuthRequirementsProvider(), properties);
        authRequirementsRegistrationByServiceId.put(anonymousAccessEnablerServiceId, service);
        LOG.info("Sling Auth Requirements Provider for anonymous access enabler service id {} registered.",
                anonymousAccessEnablerServiceId);
    }

    private void unregisterAuthRequirementsProvider(Long id) {
        ServiceRegistration<?> service = authRequirementsRegistrationByServiceId.get(id);
        if (service != null) {
            try {
                service.unregister();
                LOG.info("Sling Auth Requirement Provider service for anonymous access enabler service id {} unregistered.", id);
            } catch (IllegalStateException e) {
                LOG.warn("Sling Auth Requirement Provider service for anonymous access enabler service id {} already unregistered.", id);
            }
            authRequirementsRegistrationByServiceId.remove(id);
        } else {
            LOG.warn("Cannot find Sling auth requirement provider service for anonymous access enabler service id {} for unregister.", id);
        }
    }

    private static <T> ServiceReference<T>[] getAllServiceReferences(BundleContext bundleContext, Class<T> clazz) {
        try {
            ServiceReference<T>[] allServiceReferences = (ServiceReference<T>[]) bundleContext
                    .getAllServiceReferences(clazz.getName(), NO_FILTER);
            return allServiceReferences != null ? allServiceReferences : new ServiceReference[0];
        } catch (InvalidSyntaxException e) {
            // Cannot happen because there is no filter.
            throw new IllegalStateException("Invalid filter for searching action services.", e);
        }
    }

    @ObjectClassDefinition(name = "Anonymous User Support for Websight Admin Tools")
    public @interface AnonymousUserSupportConfiguration {
        @AttributeDefinition(
                type = AttributeType.BOOLEAN,
                name = "Allow anonymous user"
        )
        boolean allow_anonymous_user() default true;
    }

    public class SlingAuthRequirementsProvider {
    }
}
