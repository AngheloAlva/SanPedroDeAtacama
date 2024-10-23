import AdminLoginForm from "@/components/forms/admin/AdminLogin"

export default function AdminLoginPage(): React.ReactElement {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md">
				<AdminLoginForm />
			</div>
		</div>
	)
}
