import React from 'react'
import { Email, Item, Span, A, renderEmail } from 'react-html-email'
import { DOMAIN } from '../Consts'

type TemplateType<T> = (variables: T) => string

type WelcomeTemplate = {
    name: string
    activationString: string
}

const mailConst = {
    logo: `${DOMAIN}/logo/logo_transparent.png`,
}

interface Props {
    title: string
    children: any
}

const style = {
    backgroundColor: 'white',
    border: '1px solid #ece9e9',
}

const headCSS = `
  table {
    background-color: #eeeeee;
    padding: 2rem;
  }
  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`

const MailTemplate = (props: Props) => {
    return (
        <Email title={props.title} headCSS={headCSS} style={style}>
            <Item>
                <img width="100px" alt="logo" src={mailConst.logo} />
            </Item>
            <Item>{props.children}</Item>
            <Item style={{ paddingTop: '2rem' }}>
                <Span>Sincerely,</Span>
            </Item>
            <Item>
                <Span>Stoky Team</Span>
            </Item>
        </Email>
    )
}

export const WelcomeTemplate: TemplateType<WelcomeTemplate> = (variables) => {
    return renderEmail(
        <MailTemplate title="Welcome">
            <Item align="left">
                <Span fontSize={20}>Welcome {variables.name},</Span>
            </Item>
            <Item align="left">
                <Span>Thanks a lot for your interest.</Span>
            </Item>
            <Item>
                <Span>
                    Please click <A href={`${DOMAIN}/?token=${encodeURI(variables.activationString)}`}> here</A> to
                    activate your account.
                </Span>
            </Item>
            <Item>If you got any other questions please contact support@stoky.io</Item>
        </MailTemplate>
    )
}

type ForgotPassTemplate = {
    username: string
    hash: string
}

export const ForgotPassTemplate: TemplateType<ForgotPassTemplate> = (variables) => {
    return renderEmail(
        <MailTemplate title="Your Password">
            <Item align="left">
                <Span>Hi {variables.username},</Span>
            </Item>
            <Item align="left">
                <Span>
                    Please go <A href={`${DOMAIN}/token?value=${encodeURI(variables.hash)}`}>here</A> in order to reset
                    your password.
                </Span>
            </Item>
        </MailTemplate>
    )
}

type ChangeEmailTemplate = {
    name: string
    newEmail: string
    hash: string
}

export const ChangeMailTemplate: TemplateType<ChangeEmailTemplate> = (variables) => {
    return renderEmail(
        <MailTemplate title="You requested to change your email.">
            <Item align="left">
                <Span>Hi {variables.name},</Span>
            </Item>
            <Item align="left">
                <Span>
                    You have requested to change your email to: {variables.newEmail}; Please go{' '}
                    <A href={`${DOMAIN}/token?value=${encodeURI(variables.hash)}`}>here</A> in order to complete your
                    action.
                </Span>
            </Item>
        </MailTemplate>
    )
}
