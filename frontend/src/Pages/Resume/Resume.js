const Resume = () => {
    return (
        <main className="flex-shrink-0">
            {/* Page Content */}
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bolder mb-0">
                        <span className="text-gradient d-inline">Resume</span>
                    </h1>
                </div>
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-11 col-xl-9 col-xxl-8">
                        {/* Experience Section */}
                        <section>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h2 className="text-primary fw-bolder mb-0">Experience</h2>
                                {/* Download resume button */}
                                <a className="btn btn-primary px-4 py-3" href="./AlexCristeaCV.pdf" download>
                                    <div className="d-inline-block bi bi-download me-2"></div>
                                    Download Resume
                                </a>
                            </div>

                            {/* Experience Cards */}
                            {[
                                { year: "2019 - Present", role: "Web Developer", company: "Stark Industries", location: "Los Angeles, CA" },
                                { year: "2017 - 2019", role: "SEM Specialist", company: "Wayne Enterprises", location: "Gotham City, NY" }
                            ].map((exp, index) => (
                                <div key={index} className="card shadow border-0 rounded-4 mb-5">
                                    <div className="card-body p-5">
                                        <div className="row align-items-center gx-5">
                                            <div className="col text-center text-lg-start mb-4 mb-lg-0">
                                                <div className="bg-light p-4 rounded-4">
                                                    <div className="text-primary fw-bolder mb-2">{exp.year}</div>
                                                    <div className="small fw-bolder">{exp.role}</div>
                                                    <div className="small text-muted">{exp.company}</div>
                                                    <div className="small text-muted">{exp.location}</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus laudantium...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Education Section */}
                        <section>
                            <h2 className="text-secondary fw-bolder mb-4">Education</h2>
                            {[
                                { year: "2015 - 2017", degree: "Master's", field: "Web Development", school: "Barnett College", location: "Fairfield, NY" },
                                { year: "2011 - 2015", degree: "Undergraduate", field: "Computer Science", school: "ULA", location: "Los Angeles, CA" }
                            ].map((edu, index) => (
                                <div key={index} className="card shadow border-0 rounded-4 mb-5">
                                    <div className="card-body p-5">
                                        <div className="row align-items-center gx-5">
                                            <div className="col text-center text-lg-start mb-4 mb-lg-0">
                                                <div className="bg-light p-4 rounded-4">
                                                    <div className="text-secondary fw-bolder mb-2">{edu.year}</div>
                                                    <div className="mb-2">
                                                        <div className="small fw-bolder">{edu.school}</div>
                                                        <div className="small text-muted">{edu.location}</div>
                                                    </div>
                                                    <div className="fst-italic">
                                                        <div className="small text-muted">{edu.degree}</div>
                                                        <div className="small text-muted">{edu.field}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus laudantium...</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Skills Section */}
                        <section>
                            <div className="card shadow border-0 rounded-4 mb-5">
                                <div className="card-body p-5">
                                    {/* Professional Skills */}
                                    <div className="mb-5">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                                                <i className="bi bi-tools"></i>
                                            </div>
                                            <h3 className="fw-bolder mb-0">
                                                <span className="text-gradient d-inline">Professional Skills</span>
                                            </h3>
                                        </div>
                                        <div className="row row-cols-1 row-cols-md-3 mb-4">
                                            {["SEO/SEM Marketing", "Statistical Analysis", "Web Development"].map((skill, index) => (
                                                <div key={index} className="col mb-4">
                                                    <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">{skill}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    <div className="mb-0">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                                                <i className="bi bi-code-slash"></i>
                                            </div>
                                            <h3 className="fw-bolder mb-0">
                                                <span className="text-gradient d-inline">Languages</span>
                                            </h3>
                                        </div>
                                        <div className="row row-cols-1 row-cols-md-3 mb-4">
                                            {["HTML", "CSS", "JavaScript"].map((lang, index) => (
                                                <div key={index} className="col mb-4">
                                                    <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">{lang}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="row row-cols-1 row-cols-md-3">
                                            {["Python", "Ruby", "Node.js"].map((lang, index) => (
                                                <div key={index} className="col mb-4">
                                                    <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">{lang}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default Resume;
