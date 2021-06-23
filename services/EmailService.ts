import { SES } from 'aws-sdk'

const ses = new SES({
    region: 'us-east-1',
})

const notify = (to: string, subject: string, content: string) => {
    const params = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: {
                    Data: content,
                },
            },
            Subject: {
                Data: subject,
            },
        },
        Source: 'notifications@stoky.io',
    }

    return new Promise((resolve, reject) => {
        ses.sendEmail(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

export default {
    notify,
}
