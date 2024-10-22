import { WorkWithUsEmailTemplate } from "@/components/email/WorkWithUsEmailTemplate"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
	try {
		const res = await request.json()

		const { data, error } = await resend.emails.send({
			from: "rrhh@turismochiletours.com",
			to: ["rrhh@turismochiletours.com"],
			subject: "Nueva solicitud de trabajo",
			react: WorkWithUsEmailTemplate({
				data: {
					email: res.values.email,
					name: res.values.name,
					phone: res.values.phone,
					address: res.values.address,
					availability: res.values.availability,
					certifications: res.values.certifications,
					experience: res.values.experience,
					languages: res.values.languages,
					position: res.values.position,
					finalQuestion: res.values.finalQuestion,
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
