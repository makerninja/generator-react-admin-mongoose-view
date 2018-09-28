/* eslint react/jsx-key: off */
import React from 'react';
import PropTypes from 'prop-types';
import { Show, Tab, TabbedShowLayout, TextField } from 'react-admin'; // eslint-disable-line import/no-unresolved
import UserTitle from './ContactTitle';

const UserShow = ({ permissions, ...props }) => (
    <Show title={<UserTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="user.form.summary">
                {permissions === 'admin' && (
                    <TextField source="id" />
                )}
                <TextField source="lastname" />
                <TextField source="firstname" />
                <TextField source="email" />
                <TextField source="phone" />
                <TextField source="company" />
                <TextField source="occupation" />
            </Tab>
            <Tab label="contact.form.bank" path="">
                <TextField source="bank.iban" label="IBAN"/>
                <TextField source="bank.bic" label="BIC/SWIFT"/>
            </Tab>
            {permissions === 'admin' && (
            <Tab label="user.form.database" path="database">
                    <TextField source="id" />
                    <TextField source="createdAt" />
                    <TextField source="updatedAt" />
            </Tab>
            )}
        </TabbedShowLayout>
        
    </Show>
);

UserShow.propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    permissions: PropTypes.string,
};

export default UserShow;
