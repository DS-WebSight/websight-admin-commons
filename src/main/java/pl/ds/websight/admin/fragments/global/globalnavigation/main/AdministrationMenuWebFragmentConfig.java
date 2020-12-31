package pl.ds.websight.admin.fragments.global.globalnavigation.main;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Administration Menu Web Fragment configuration")
public @interface AdministrationMenuWebFragmentConfig {

    @AttributeDefinition(name = "Restricted Groups IDs", description = "Members of these groups are not able to see administration tools menu")
    String[] restrictedGroups() default {};
}
