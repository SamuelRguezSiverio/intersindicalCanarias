import React, { useState, useEffect } from 'react'
import { getAdminsByHospital, updateAdmin } from '../../services/auth'
import './Admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  const [admins, setAdmins] = useState([])
  const [editAdminId, setEditAdminId] = useState(null)
  const [formData, setFormData] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const fetchAdmins = async () => {
    const response = await getAdminsByHospital()
    setAdmins(response.data)
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
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>


<div className="search-box">
      <button className="btn-search">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        type="text"
        className="input-search"
        placeholder="Buscador de usuarios..."
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
              <th>Es Admin</th>
              <th>Está Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>
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
                <td>
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
                <td>
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
                <td>
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
                <td>
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
                <td>
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
                <td>
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
                <td>
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
                </td>
                <td>
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
                <td>
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
                    <button
                      className="button-edit"
                      role="button"
                      onClick={() => handleEdit(admin)}
                    >
                      Editar
                    </button>
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
