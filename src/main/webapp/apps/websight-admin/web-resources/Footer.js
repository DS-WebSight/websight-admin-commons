import React from 'react';

import WebFragments from 'websight-fragments-esm';
import { errorNotification } from 'websight-rest-atlaskit-client/Notification';

const FooterFragment = () => (
    <WebFragments fragmentsKey='websight.global.page.footer' errorNotification={errorNotification} />
);

export default class Footer extends React.Component {
    render() {
        return (
            <FooterFragment />
        );
    }
}