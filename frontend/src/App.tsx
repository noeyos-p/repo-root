import { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap'
import { api } from './api'
import type { User } from './types'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get<User[]>('/users')
      setUsers(data)
    } finally { setLoading(false) }
  }

  async function add() {
    if (!name || !city) return alert('이름/도시를 입력하세요')
    await api.post('/users', { name, city })
    // axios가 자동으로 JSON 타입으로 바꿔주기 때문에 name과 city는 ""로 묶지 않아도 됨
    setName(''); setCity('')
    await load()
  }

  async function remove(id: number) {
    await api.delete(`/users/${id}`)
    await load()
  }

  useEffect(() => { load() }, [])

  return (
    <Container className="py-4">
      <div className="p-6">
        <h1>My App</h1>
        <p className="mt-2">CI/CD OK 🚀</p>
      </div>
      <Row className="mb-3">
        <Col><h3>사용자 관리</h3></Col>
      </Row>

      <Row className="g-2 align-items-end mb-4">
        <Col md={4}>
          <Form.Label>이름</Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)}
            placeholder="홍길동" />
        </Col>
        <Col md={4}>
          <Form.Label>도시</Form.Label>
          <Form.Control value={city} onChange={e => setCity(e.target.value)}
            placeholder="Seoul" />
        </Col>
        <Col md={4}>
          <Button onClick={add}>추가</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          {loading ? <div>로딩중…</div> : (
            <Table striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>이름</th>
                  <th>도시</th>
                  <th style={{ width: 120 }}>액션</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.city}</td>
                    <td><Button variant="outline-danger" size="sm"
                      onClick={() => remove(u.id)}>삭제</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
}