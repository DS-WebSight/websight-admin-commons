import React from 'react';

import { getWebFragments } from 'websight-fragments-esm';
import { errorNotification } from 'websight-rest-atlaskit-client/Notification';
import { AUTH_CONTEXT_UPDATED } from 'websight-rest-atlaskit-client/RestClient';

import NavigationItemsSkeleton from './NavigationItemsSkeleton.js';

const NAVIGATION_ITEMS_SKELETON_CONFIGS_LOCAL_STORAGE_KEY = 'websight.global-navigation.items.skeleton.configs';

export default class NavigationItemsController extends React.Component {

    constructor(props) {
        super(props);

        const skeletonConfigs = localStorage.getItem(NAVIGATION_ITEMS_SKELETON_CONFIGS_LOCAL_STORAGE_KEY);
        this.state = {
            components: null,
            loadingComponent: <NavigationItemsSkeleton skeletonConfigs={skeletonConfigs} />
        }

        this.successHandler = this.successHandler.bind(this);
    }

    componentDidMount() {
        getWebFragments('websight.global.global-navigation.main', this.successHandler, errorNotification);
        window.addEventListener(AUTH_CONTEXT_UPDATED, () => {
            getWebFragments('websight.global.global-navigation.main', this.successHandler, errorNotification);
        });
    }

    successHandler(fragments) {
        if (fragments !== null) {
            const fragmentImports = [];
            const skeletonConfigs = [];
            fragments.forEach(fragment => {
                skeletonConfigs.push(fragment.skeletonConfig);
                fragmentImports.push(import(fragment.menuButtonComponent));
            });
            localStorage.setItem(NAVIGATION_ITEMS_SKELETON_CONFIGS_LOCAL_STORAGE_KEY, JSON.stringify(skeletonConfigs));
            Promise.all(fragmentImports)
                .then(modules => this.getModules(modules.map(module => module.default)))
                .catch(error => errorNotification(error));
        }
    }

    getModules(modules) {
        this.setState({
            components: modules.map((Component, index) => (<Component key={index} />))
        });
    }

    render() {
        const { components, loadingComponent } = this.state;
        if (components === null) {
            return loadingComponent;
        }
        return components;
    }
}