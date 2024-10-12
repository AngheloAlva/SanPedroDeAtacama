"use client"

import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog"

export default function ImagesCard({
	images,
	handleDeleteImage,
	setImageResources,
}: {
	images?: string[]
	handleDeleteImage: (imageUrl: string) => void
	setImageResources: React.Dispatch<React.SetStateAction<string[]>>
}): React.ReactElement {
	return (
		<Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Image
						width="300"
						height="300"
						alt="Product image"
						className="aspect-square w-full rounded-md object-cover"
						src={images?.[0] ?? "/placeholder.png"}
					/>

					<div className="grid grid-cols-3 gap-2">
						{images?.map((image, index) => (
							<div key={index} className="group relative flex items-center justify-center">
								<Image
									width="84"
									height="84"
									src={image}
									alt="Product image"
									className="aspect-square w-full rounded-md object-cover"
								/>

								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											className="absolute mx-auto h-fit transform rounded-md px-1 py-0.5 text-sm text-white transition-all hover:scale-105"
											variant="destructive"
										>
											Delete
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you sure you want to delete this image?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone and the image will be permanently removed. Are
												you sure you want to continue?
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={() => handleDeleteImage(image)}>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						))}

						<CldUploadButton
							className="relative flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
							onSuccess={({ info }) => {
								if (typeof info !== "string" && info?.secure_url) {
									setImageResources((prev) => [...(prev ?? []), info.secure_url])
								}
							}}
							uploadPreset="ml_default"
						>
							<Upload className="h-4 w-4 text-muted-foreground" />
							<span className="sr-only">Upload</span>
						</CldUploadButton>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
