import React from 'react';

import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

import ListenForKeyboardShortcut from './ListenForKeyboardShortcut.js';

/**
 * Action confirmation modal
 *
 * @param buttonText            String      Text that will be shown on confirmation button. Default: 'Confirm'
 * @param onConfirm             Function    Function that will be triggered on confirmation button click. Required
 * @param heading               String      Text that will be shown on modal heading. Default: 'Please confirm your action'
 * @param appearance            String      Type of modal. Affects modal colors. Options: 'danger', 'warning'. Default: 'danger'
 * @param message               String      Text that will appear in the body of modal
 * @param autoFocusConfirm      Boolean     Flag to auto focus confirmation button. Default: Cancel button is focused
 */
export default class ConfirmationModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isExecuting: false
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    open() {
        this.setState({ isOpen: true, isExecuting: false });
    }

    close() {
        this.setState({ isOpen: false, isExecuting: false });
    }

    onConfirm() {
        this.setState({ isExecuting: true });
        this.props.onConfirm();
    }

    render() {
        const { isOpen } = this.state;
        const actions = [
            {
                text: this.props.buttonText || 'Confirm',
                onClick: this.onConfirm,
                isLoading: this.state.isExecuting,
                autoFocus: this.props.autoFocusConfirm
            },
            {
                text: 'Cancel',
                onClick: this.close,
                autoFocus: !this.props.autoFocusConfirm
            }
        ];

        return (
            <ModalTransition>
                {isOpen && (
                    <>
                        <ListenForKeyboardShortcut
                            key='Escape'
                            keyCodes={['Escape']}
                            callback={() => this.close()}
                        />
                        <Modal
                            actions={actions}
                            onClose={this.close}
                            heading={this.props.heading || 'Please confirm your action'}
                            appearance={this.props.appearance}
                            shouldCloseOnEscapePress={true}
                        >
                            {this.props.message}
                        </Modal>
                    </>
                )}
            </ModalTransition>
        );
    }
}