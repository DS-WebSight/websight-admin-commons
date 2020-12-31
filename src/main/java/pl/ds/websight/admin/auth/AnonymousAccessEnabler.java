package pl.ds.websight.admin.auth;

/**
 * Implementing this interface you can create entries for SlingAuthenticator. No restrictions entries can be added using this interface.
 * All returned paths will be excluded from Sling Authentication mechanism
 */
public interface AnonymousAccessEnabler {

    String[] getPaths();
}
