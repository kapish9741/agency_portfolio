import { InfiniteSlider } from '@/components/ui/infinite-slider'

export default function LogoCloud() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                    <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                        <div className="flex">
                            <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/1.png"
                                alt="Nvidia Logo"
                                height="30"
                                width="auto" />
                        </div>

                        <div className="flex">
                            <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/2.png"
                                alt="Biowaste Solutions Logo"
                                height="30"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/3.png"
                                alt="Sprouters Logo"
                                height="30"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/1.png"
                                alt="Nvidia Logo"
                                height="30"
                                width="auto" />
                        </div>

                        <div className="flex">
                            <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/2.png"
                                alt="Biowaste Solutions Logo"
                                height="30"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/3.png"
                                alt="Sprouters Logo"
                                height="30"
                                width="auto" />
                        </div>
                        <div className="flex">
                            <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/1.png"
                                alt="Sprouters Logo"
                                height="30"
                                width="auto" />
                        </div>
                        <div className="flex">
                             <img
                                className="mx-auto h-20 w-fit dark:invert"
                                src="/LogoCloud/2.png"
                                alt="Sprouters Logo"
                                height="30"
                                width="auto" />
                        </div>
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    );
}
