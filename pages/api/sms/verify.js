import otpModel from '@/models/otp'

const handler = async (req, res) => {

    if (req.method !== 'POST') {
        return false;
    }

    const { phone, code } = req.body;

    const otp = await otpModel.findOne({ phone, code })

    if (otp) {
        const date = new Date()
        const now = date.getTime();

        if (otp.expTime > now) {
            return res.status(200).json({ message: 'code is correct :))' })
        } else {
            return res.status(410).json({ message: 'code is expired !! :))' })
        }

    } else {
        return res.status(409).json({ message: 'code is not correct !!' })
    }
}

export default handler;