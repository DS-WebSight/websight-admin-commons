import React from 'react';
import { SkeletonPrimaryButton } from '@atlaskit/atlassian-navigation/skeleton';

export default class NavigationItemsSkeleton extends React.Component {
    render() {
        const skeletonConfigs = JSON.parse(this.props.skeletonConfigs);
        let buttons;
        if (skeletonConfigs) {
            buttons = skeletonConfigs.map((config, index) => <SkeletonPrimaryButton key={index} text={config.name} {...config.buttonConfig}/>);
        } else {
            buttons = <SkeletonPrimaryButton text={'Building navigation...'}/>;
        }

        return (
            <>
                {buttons}
            </>
        );
    }
}
