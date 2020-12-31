import React from 'react';
import { Link } from 'react-router-dom'
import { BreadcrumbsItem, BreadcrumbsStateless } from '@atlaskit/breadcrumbs';

import { ADMINISTRATION_ROOT_PATH } from './utils/AdminConstants.js';

const breadcrumbsBase = [
    { text: 'WebSight', path: '/', reactPath: '' },
    { text: 'Administration', path: ADMINISTRATION_ROOT_PATH, reactPath: '' }
];

/**
 * @param breadcrumbs   Array   Array of objects where each object convert to one breadcrumb item
 *                                  eg. { text: 'Item name', path: '', reactPath: ''}
 */
export default class Breadcrumbs extends React.Component {
    breadcrumbWithReactPath(breadcrumb) {
        return (
            <BreadcrumbsItem
                text={breadcrumb.text}
                key={breadcrumb.text}
                href={breadcrumb.reactPath}
                component={({ className, href, children, onMouseEnter, onMouseLeave }) => (
                    <Link
                        className={className}
                        to={href}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}>
                        {children}
                    </Link>
                )}
            />
        )
    }

    breadcrumbWithoutReactPath(breadcrumb) {
        return (
            <BreadcrumbsItem
                text={breadcrumb.text}
                key={breadcrumb.text}
                href={breadcrumb.path}
            />
        )
    }

    render() {
        const breadcrumbs = [...breadcrumbsBase, ...this.props.breadcrumbs];

        return (
            <BreadcrumbsStateless>
                {breadcrumbs.map((breadcrumb) => (
                    breadcrumb.reactPath ?
                        this.breadcrumbWithReactPath(breadcrumb) : this.breadcrumbWithoutReactPath(breadcrumb)
                ))}
            </BreadcrumbsStateless>
        )
    }
}