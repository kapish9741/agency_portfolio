import { InfiniteSlider } from '@/components/ui/infinite-slider'

export default function LogoCloud() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                    <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                        <div className="flex">
                            <img
                                className="mx-auto h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                alt="Nvidia Logo"
                                height="20"
                                width="auto" />
                        </div>

                        <div className="flex">
                            <img
                                className="mx-auto h-4 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/column.svg"
                                alt="Column Logo"
                                height="16"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-4 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/github.svg"
                                alt="GitHub Logo"
                                height="16"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/nike.svg"
                                alt="Nike Logo"
                                height="20"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-5 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                alt="Lemon Squeezy Logo"
                                height="20"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-4 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/laravel.svg"
                                alt="Laravel Logo"
                                height="16"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-7 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/lilly.svg"
                                alt="Lilly Logo"
                                height="28"
                                width="auto" />
                        </div>

                        <div className="flex">
                            <img
                                className="mx-auto h-6 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/openai.svg"
                                alt="OpenAI Logo"
                                height="24"
                                width="auto" />
                        </div>
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    );
}
