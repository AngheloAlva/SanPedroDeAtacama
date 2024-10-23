import SumarySection from "@/components/cart/SumarySection"
import CartSection from "@/components/cart/CartSection"
import { Separator } from "@/components/ui/separator"
import StepsCard from "@/components/cart/StepsCard"

export default async function CartPage(): Promise<React.ReactElement> {
	return (
		<StepsCard step={1}>
			<div className="flex min-h-full flex-col items-start justify-center gap-6 sm:mt-4 sm:gap-y-10 md:mt-6 md:flex-row">
				<CartSection className="w-full md:w-2/3" />

				<Separator className="md:hidden" />

				<SumarySection className="w-full md:w-1/3" />
			</div>
		</StepsCard>
	)
}
