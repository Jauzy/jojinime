import React from 'react'
const COLORS = require('../../../static/constants/Colors')

const Pengaturan = props => {
    return (
        <div className='container py-5 text-white'>
            <div className='mt-4 d-flex text-wrap'>
                <h1 className='font-weight-bold my-auto'>Pengaturan Akun</h1>
                <i className='fa fa-pen my-auto ml-3 text-main' style={{ cursor: 'pointer', fontSize: '30px' }} />
            </div>
            <table className='mt-3' style={{ width: '100%' }}>
                <tr>
                    <td><h4>Warna Tema Utama</h4></td>
                    <td><h4>: <input type='color' value={COLORS.MAIN} onChange={(e) => COLORS.changeMainColor(e.target.value)} /></h4></td>
                </tr>
                <tr>
                    <td><h4>Warna Tema Sekunder</h4></td>
                    <td><h4>: <input type='color' value={COLORS.SECONDARY} onChange={(e) => COLORS.changeSecondaryColor(e.target.value)} /></h4></td>
                </tr>
                <tr>
                    <td><h4>Warna Tema Sekunder Cerah</h4></td>
                    <td><h4>: <input type='color' value={COLORS.LIGHTSECONDARY} onChange={(e) => COLORS.changeLightSecondaryColor(e.target.value)} /></h4></td>
                </tr>
                <tr>
                    <td><h4>Warna Tema Sekunder Gelap</h4></td>
                    <td><h4>: <input type='color' value={COLORS.DARKSECONDARY} onChange={(e) => COLORS.changeDarkSecondaryColor(e.target.value)} /></h4></td>
                </tr>
            </table>

        </div>
    )
}

export default Pengaturan