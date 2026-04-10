import Button from '../components/Button';
import Me from '../assets/images/about_me.jpg';
import spiderman from '../assets/images/spiderman_hobbies.jpg';   
import jdm from '../assets/images/jdm.jpg';
import jordan from '../assets/images/jordan.jpg';
import antman from '../assets/images/antman.jpg';
import Footer from "../components/Footer";

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="rounded-[1.25rem] border-2 border-solid border-zinc-900 overflow-hidden w-100 h-100 ml-50">
                        <img src={Me} className="h-100 w-100 object-fill block" />
                    </div>

                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            About Developer Section
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Sean Adrian Bautista Morales
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            I am a 21-year-old student developer whose main goal is to create solutions. Taking up BSIT-MWA in NU-Manila, I am fluent in 4 programming languages.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
                            <Button to="/articles">Open Articles</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Profile Overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick summary blocks</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">21</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Years Old
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">3.85</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            General Weighted Average (2022-2026)
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">4</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Language Proficiencies
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">3.5</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Years of Coding Experience
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            EDUCATION
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Academic Background</h2>

                        <div className="mt-6 space-y-4">
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">National University - Manila</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    College | BSIT - Mobile and Web Applications | 2022-2027
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">Quezon City Academy Foundation Inc.</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    High School | Track Strand: STEM | With High Honors | Graduated 2022
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">Elyseum Christian School</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                   Elementary | Graduated 2016
                                </p>
                            </article>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Other Hobbies and Favorites
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={spiderman} className="h-100 w-100 object-fill block" />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={jdm} className="h-100 w-100 object-fill block" />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={jordan} className="h-120 w-100 object-fill block" />
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={antman} className="h-120 w-100 object-fill block" />
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </section>
            <Footer />
        </div>
    );
};

export default AboutPage;