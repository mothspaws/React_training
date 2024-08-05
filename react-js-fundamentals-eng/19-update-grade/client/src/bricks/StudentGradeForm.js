import { useState } from "react"
import Icon from "@mdi/react"
import { mdiLoading } from "@mdi/js"
import { Modal, Form, Button, Row, Col } from "react-bootstrap"

export default function StudentGradeForm({
  student,
  subject,
  show,
  setAddGradeShow,
  onComplete,
}) {
  const defaultForm = {
    description: "",
    dateTs: new Date().toISOString().substring(0, 10),
    grade: null,
    weight: 1,
  }

  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState(defaultForm)
  const [studentAddGradeCall, setStudentAddGradeCall] = useState({
    state: "inactive",
  })

  const handleClose = () => {
    setFormData(defaultForm)
    setAddGradeShow(false)
  }

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData }
      newData[name] = val
      return newData
    })
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget

    e.preventDefault()
    e.stopPropagation()

    const payload = {
      ...formData,
      studentId: student.id,
      subjectId: subject.id,
    }

    if (!form.checkValidity()) {
      setValidated(true)
      return
    }

    setStudentAddGradeCall({ state: "pending" })
    const res = await fetch(`http://localhost:3000/grade/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (res.status >= 400) {
      setStudentAddGradeCall({ state: "error", error: data })
    } else {
      setStudentAddGradeCall({ state: "success", data })

      if (typeof onComplete === "function") {
        onComplete(data)
      }

      handleClose()
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a grade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Student: {student.firstname + " " + student.surname}</div>
            <div>Subject: {subject.name}</div>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
                maxLength={20}
                required
              />
              <Form.Control.Feedback type="invalid">
                Enter a description with a maximum length of 20 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1-5"
                  value={formData.grade}
                  onChange={(e) => setField("grade", parseInt(e.target.value))}
                  min={1}
                  max={5}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Select
                  value={formData.weight}
                  onChange={(e) => setField("weight", Number(e.target.value))}
                  required
                >
                  <option value="" disabled>
                    Grade weight
                  </option>
                  <option value={0.5}>0.5</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.dateTs}
                onChange={(e) => setField("dateTs", e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <div>
                {studentAddGradeCall.state === "error" && (
                  <div className="text-danger">
                    Error: {studentAddGradeCall.error.errorMessage}
                  </div>
                )}
              </div>
              <div className="d-flex flex-row gap-2">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={studentAddGradeCall.state === "pending"}
                >
                  {studentAddGradeCall.state === "pending" ? (
                    <Icon size={0.8} path={mdiLoading} spin={true} />
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
