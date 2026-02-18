import {
	Carousel,
	CarouselContent,
	CarouselPrevious,
	CarouselNext,
	CarouselItem,
} from "@/components/ui/carousel";
import { templates } from "@/lib/templates";
import Link from "next/link";

function TemplatesGallery() {
	return (
		<div className="my-16 mx-8">
			<div className="text-2xl">Start a new paper</div>

			<Carousel className="my-8 mx-10 relative">
				<div className="absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-background/80 to-transparent z-10 pointer-events-none"></div>
				<CarouselPrevious />
				<CarouselContent>
					{templates.map((template) => (
						<CarouselItem
							key={template.name}
							className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
						>
							<div className="p-4">
                <Link href={`dashboard/${template.type}`} className="cursor-pointer">
                  <div
                    className="w-full aspect-3/4 rounded-lg bg-muted border border-border overflow-hidden"
                    style={{
                      backgroundImage: `url(${template.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </Link>
								<div className="mt-3 text-center">
									<div className="text-sm text-muted-foreground">
										{template.type}
									</div>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselNext />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-linear-to-l from-background/80 to-transparent z-10 pointer-events-none"></div>
			</Carousel>
		</div>
	);
}

export default TemplatesGallery;
