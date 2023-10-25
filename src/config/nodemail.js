const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});


		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
			html:
				'<div style="display:flex;flex-direction:column;"<p>Bạn click vào đường link bên dưới để xác thực tài khoản</p> <img style="width:100px; height:100px;" src="cid:unique@kreata.ee"></img> <a href=\"' + text + '/">Verify Your Account</a> </div>',
			attachments: [{
				filename: 'lovemayou.jpeg',
				path: "C:/Users/botho/T1/src/public/img/background/lovemayou.jpeg",
				cid: 'unique@kreata.ee'


			}]

		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};