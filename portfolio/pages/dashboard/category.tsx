import React from 'react'
import { useForm } from 'react-hook-form'
import { Dropzone } from '../../components/dropzone'
import { ButtonSubmit } from '../../components/form/btn-submit'
import InputField from '../../components/form/input'
import TextAreaField from '../../components/form/text-area'
import { useLogin } from '../../components/hook/auth'
import { useLoginForm } from '../../components/hook/useLoginForm'
import { usePopup } from '../../components/hook/usePopup'
import AdminLayout from '../../components/layout/auth'
import Popup from '../../components/popup'
import { Table } from '../../components/table'
import { TableContext, useTableContext } from '../../components/table/useTableContext'

const rows = [
    { id: 1, name: 'Liz Lemon', age: 36, is_manager: true, start_date: '02-28-1999' },
    { id: 2, name: 'Jack Donaghy', age: 40, is_manager: true, start_date: '03-05-1997' },
    { id: 3, name: 'Tracy Morgan', age: 39, is_manager: false, start_date: '07-12-2002' },
    { id: 4, name: 'Jenna Maroney', age: 40, is_manager: false, start_date: '02-28-1999' },
    { id: 5, name: 'Kenneth Parcell', age: Infinity, is_manager: false, start_date: '01-01-1970' },
    { id: 6, name: 'Pete Hornberger', age: null, is_manager: true, start_date: '04-01-2000' },
    { id: 7, name: 'Frank Rossitano', age: 36, is_manager: false, start_date: null },
    { id: 8, name: null, age: null, is_manager: null, start_date: null },
]

const columns = [
    { accessor: 'name', label: 'Name' },
    { accessor: 'age', label: 'Age' },
    { accessor: 'is_manager', label: 'Manager', format: value => (value ? '✔️' : '✖️') },
    { accessor: 'start_date', label: 'Start Date' },
]
const CloseIcon = ({ changePopup }) => {
    return <button onClick={changePopup} className="close"></button>
}
const Category = () => {

    const { changePopup, popup } = usePopup()
    const { control, onSubmit, loading } = useLoginForm()

    return (
        <div className='main'>
            <div className="table-wrapper">
                <Table rows={rows} columns={columns}>
                    <Table.TableTitle title="Category" changePopup={changePopup} />
                    <table className="responsive-table">
                        <Table.TableHead />
                        <Table.TableBody />
                    </table>
                    <Table.Pagination />
                </Table>
            </div>
            {popup && <Popup title="Add Category" popup={popup} closeIcon={<CloseIcon changePopup={changePopup} />} >
                <form>
                    <InputField name="email" classes={{ input: "input-field", root: '', label: "label" }} control={control} type="text" placeholder='Enter Email' label="" />
                    <TextAreaField name="email" classes={{ input: "text-field", root: '', label: "label" }} control={control} rows={4} cols={50} placeholder='Enter Email' label="" />
                    <Dropzone />
                    <ButtonSubmit classNames={{ dock: "add-submit", submit: `submit ${loading ? 'spin' : ''}` }} >Submit</ButtonSubmit>
                </form>
            </Popup>}


        </div>
    )
}
Category.getLayout = (page) => <AdminLayout>{page}</AdminLayout>


export default Category