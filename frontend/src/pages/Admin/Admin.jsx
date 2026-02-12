import React, { useState, useEffect } from 'react'
import {
  getAdminsByHospital,
  updateAdmin,
  deleteAdminById,
} from '../../services/auth'
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Admin = () => {
  const [admins, setAdmins] = useState([])
  const [editAdminId, setEditAdminId] = useState(null)
  const [formData, setFormData] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const fetchAdmins = async () => {
    try {
      const response = await getAdminsByHospital()
      setAdmins(response.data)
    } catch (error) {
      console.error('Error fetching admins:', error)
      if (error.response && error.response.status === 403) {
        setAdmins([])
        // Optional: You could add a UI message here
      }
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const handleEdit = (admin) => {
    setEditAdminId(admin.id)
    setFormData(admin)
  }

  const handleCancel = () => {
    setEditAdminId(null)
    setFormData({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = async () => {
    await updateAdmin(editAdminId, formData)
    setEditAdminId(null)
    setFormData({})
    await fetchAdmins()
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredAdmins = admins.filter((admin) =>
    admin.nif.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (adminId) => {
    try {
      await deleteAdminById(adminId)
      setAdmins(admins.filter((admin) => admin.id !== adminId))
    } catch (error) {
      console.error('Error al eliminar el administrador:', error)
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  }

  return (
    <div className="container">
      <div className="search-box">
        <button className="btn-search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Buscador por NIF de usuarios..."
          onChange={handleSearchChange}
        />
      </div>

      <div className="table-responsive">
        <table className="table-admins">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>NIF</th>
              <th>Email</th>
              <th>Móvil</th>
              <th>Categoría</th>
              <th>Hospital</th>
              <th>Centro</th>
              <th>Está Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id}>
                <td data-label="Nombre">
                  {editAdminId === admin.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.name
                  )}
                </td>
                <td data-label="Apellidos">
                  {editAdminId === admin.id ? (
                    <input
                      type="text"
                      name="surName"
                      value={formData.surName}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.surName
                  )}
                </td>
                <td data-label="NIF">
                  {editAdminId === admin.id ? (
                    <input
                      type="text"
                      name="nif"
                      value={formData.nif}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.nif
                  )}
                </td>
                <td data-label="Email">
                  {editAdminId === admin.id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.email
                  )}
                </td>
                <td data-label="Móvil">
                  {editAdminId === admin.id ? (
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.mobile
                  )}
                </td>
                <td data-label="Categoría">
                  {editAdminId === admin.id ? (
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.category
                  )}
                </td>
                <td data-label="Hospital">
                  {editAdminId === admin.id ? (
                    <input
                      type="text"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.hospital
                  )}
                </td>
                <td data-label="Centro de Trabajo">
                  {editAdminId === admin.id ? (
                    <input
                      type="text"
                      name="workPlace"
                      value={formData.workPlace}
                      onChange={handleChange}
                    />
                  ) : (
                    admin.workPlace
                  )}
                </td>
                {/* <td>
                  {editAdminId === admin.id ? (
                    <input
                      type="checkbox"
                      name="isAdmin"
                      checked={formData.isAdmin}
                      onChange={(e) =>
                        handleChange({
                          target: { name: 'isAdmin', value: e.target.checked },
                        })
                      }
                    />
                  ) : admin.isAdmin ? (
                    'Sí'
                  ) : (
                    'No'
                  )}
                </td> */}
                <td data-label="Está Activo">
                  {editAdminId === admin.id ? (
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={(e) =>
                        handleChange({
                          target: { name: 'isActive', value: e.target.checked },
                        })
                      }
                    />
                  ) : admin.isActive ? (
                    'Sí'
                  ) : (
                    'No'
                  )}
                </td>
                <td data-label="Acciones">
                  {editAdminId === admin.id ? (
                    <>
                      <button
                        className="button-save"
                        role="button"
                        onClick={handleSave}
                      >
                        Guardar
                      </button>
                      <button
                        className="button-cancel"
                        role="button"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="button-edit"
                        role="button"
                        onClick={() => handleEdit(admin)}
                      >
                        Editar
                      </button>
                      <button
                        className="button-cancel"
                        role="button"
                        onClick={() => handleDelete(admin.id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
