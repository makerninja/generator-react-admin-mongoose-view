/* eslint react/jsx-key: off */
import React from 'react';
import {
    Create,
    FormTab,
    SaveButton,
    SelectInput,
    TabbedForm,
    TextInput,
    Toolbar,
    required,
} from 'react-admin';

const ContactEditToolbar = ({ permissions, ...props }) => (
    <Toolbar {...props}>
        <SaveButton
            label="contact.action.save_and_show"
            redirect="show"
            submitOnEnter={true}
        />
        {permissions === 'admin' && (
            <SaveButton
                label="contact.action.save_and_add"
                redirect={false}
                submitOnEnter={false}
                variant="flat"
            />
        )}
    </Toolbar>
);

const ContactCreate = ({ permissions, ...props }) => (
    <Create {...props}>
        <TabbedForm toolbar={<ContactEditToolbar permissions={permissions} />}>
            <FormTab label="contact.form.summary" path="">
                <TextInput source="firstname" defaultValue="John" validate={required()}/>
                <TextInput source="lastname" defaultValue="DOE" validate={required()}/>
                <TextInput source="email" validate={required()}/>
                <TextInput source="phone"/>
                <TextInput source="company"/>
                <TextInput source="occupation"/>
            </FormTab>
            <FormTab label="contact.form.bank" path="">
                <TextInput source="bank.iban"/>
                <TextInput source="bank.bic"/>
            </FormTab>
            {permissions === 'admin' && (
                <FormTab label="contact.form.security" path="security">
                    
                </FormTab>
            )}
        </TabbedForm>
    </Create>
);

export default ContactCreate;
