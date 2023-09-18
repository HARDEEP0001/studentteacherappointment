import React from 'react'

function Card() {
    return (
        <>
            <div className="d-flex text-center justify-content-center">
                <div className="row row-cols-3 row-cols-2 row-cols-lg-5 g-2 g-lg-3">

                    <div className="card col mx-4" style={{ width: '18rem', height: '18rem' }}>
                        <img src="https://static.vecteezy.com/system/resources/previews/001/925/922/non_2x/investment-in-education-concept-free-vector.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Student</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            <a href="/student/login" className="btn btn-primary mb-4">Lets Go</a>
                        </div>
                    </div>
                    <div className="card col mx-4 " style={{ width: '18rem', height: '18rem' }}>
                        <img src="https://static.vecteezy.com/system/resources/previews/011/277/699/non_2x/female-young-school-teacher-teaching-lesson-in-classroom-smiling-woman-standing-beside-blackboard-explaining-material-school-banner-education-knowledge-study-concept-cartoon-illustration-free-vector.jpg" className="card-img-top" alt="..." style={{ height: '187', width: '184' }} />
                        <div className="card-body">
                            <h5 className="card-title">Teacher</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            <a href="/teacher/login" className="btn btn-primary">Lets Go</a>
                        </div>
                    </div>
                    <div className="card col mx-4" style={{ width: '18rem', height: '18rem' }}>
                        <img src="https://static.vecteezy.com/system/resources/previews/020/391/409/non_2x/team-management-icon-vector.jpg" className="card-img-top mt-5" alt="..." style={{ height: '187', width: '184' }} />
                        <div className="card-body">
                            <h5 className="card-title">Admin</h5>
                            {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                            <a href="/admin/dashboard" className="btn btn-primary">Lets Go</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card