import Button from "../components/Button";
import photo from '../assets/images/portrait_pic.jpeg';
import corvette from '../assets/images/corvetteC6.jpg';
import c63 from '../assets/images/mercedes_c63.jpg';
import evoX from '../assets/images/evoX.jpg';
import Footer from "../components/Footer";


const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                   

                    <div className="overflow-hidden w-150 ml-50">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Developer Information
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Sean Adrian Bautista Morales
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            Student Developer with a passion for coding and fast cars.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/about" variant="primary">
                               Know More
                            </Button>
                            
                        </div>
                    </div>

                     <div className="rounded-[1.25rem] border-2 border-dashed border-zinc-300 overflow-hidden w-100 ml-20">
                        <img src={photo} className="h-100 w-100 object-fill block" />
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Projects Section
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick Overview</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">6</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Projects
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">3</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            On Going Certifications
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">4</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Proficient Programming Languages
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">3.5</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Years of Amateur Experience
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Featured Cars
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Some of My Favorite Cars</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img src={corvette} className="h-100 w-140 object-fill block" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">Corvette C6</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            A highly regarded, reliable sports car known for its LS-series V8 power, featuring a 6.0L LS2 (400 hp) initially, later replaced by a 6.2L LS3 (430-436 hp)
                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img src={c63} className="h-100 w-140 object-fill block" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">AMG C63</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
an iconic high-performance luxury car, most famously featuring a handcrafted 4.0-liter biturbo V8 engine (M177) producing up to 503 hp and 516 lb-ft of torque in the C63 S                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                            <img src={evoX} className="h-100 w-140 object-fill block" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">Evo X</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
tenth and final generation of the iconic sports sedan, produced from 2007 to 2016. It featured a 2.0L turbocharged 4B11T engine, advanced Super All-Wheel Control (S-AWC), and either a 5-speed manual or 6-speed twin-clutch SST transmission, producing up to 303 hp in the Final Edition.                        </p>
                        <Button className="mt-4" variant="primary">
                            View More
                        </Button>
                    </article>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;