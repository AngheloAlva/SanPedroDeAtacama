import { ContactEmailTemplate } from "@/components/email/ContactEmailTemplate"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
	try {
		const res = await request.json()

		const email =
			res.source === "wholesaler"
				? "contactoweb@turismochiletours.com"
				: "contactoweb@turismochiletours.com"

		const subject =
			res.source === "wholesaler" ? "Nuevo mensaje de Mayoristas" : "Nuevo mensaje de Contacto"

		const { data, error } = await resend.emails.send({
			from: email,
			to: [email],
			subject,
			react: ContactEmailTemplate({
				data: {
					name: res.values.name,
					email: res.values.email,
					phone: res.values.phone,
					message: res.values.message,
				},
			}),
		})

		if (error) {
			return Response.json({ error }, { status: 500 })
		}

		return Response.json(data)
	} catch (error) {
		return Response.json({ error }, { status: 500 })
	}
}
