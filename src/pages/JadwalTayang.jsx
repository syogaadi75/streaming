import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardDaftarAnime from '../components/daftar_anime/CardDaftarAnime'
import Header from '../components/Header'
import Loading from './Loading'

function JadwalTayang() {
    const apiUrl = useSelector(state => state.api.apiUrl)
    const [senins, setSenins] = useState([])
    const [selasas, setSelasas] = useState([])
    const [rabus, setRabus] = useState([])
    const [kamiss, setKamiss] = useState([])
    const [jumats, setJumats] = useState([])
    const [sabtus, setSabtus] = useState([])
    const [minggus, setMinggus] = useState([])
    const [loading, setLoading] = useState(true)

    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

    useEffect(() => {
        const fetchData = async () => {
            const getJadwal = await axios.get(apiUrl + '/films/jadwal')
            var x = 0
            getJadwal.data.film.forEach(el => {
                let date = new Date(el.updated_at)
                date.getDay() == 0 && minggus.push(el)
                date.getDay() == 1 && senins.push(el)
                date.getDay() == 2 && selasas.push(el)
                date.getDay() == 3 && rabus.push(el)
                date.getDay() == 4 && kamiss.push(el)
                date.getDay() == 5 && jumats.push(el)
                date.getDay() == 6 && sabtus.push(el)
                x++
                if (getJadwal.data.film.length == x) {
                    setLoading(false)
                }
            });
        }

        fetchData()
    }, [])


    return (
        <div className='jost'>
            <Header />
            {loading ? (
                <div className='w-full h-screen flex justify-center items-center text-lg text-light flex-col gap-2'>
                    <Loading />
                </div>
            ) : (
                <div className='text-light pb-8 pt-24 min-h-screen'>
                    <div className="flex justify-between items-center px-6 lg:px-10">
                        <h1 className='pb-3 mb-8 pr-10 border-b-2 border-primary lg:text-2xl font-semibold'>Jadwal Tayang</h1>
                    </div>
                    <h1 className='px-6 lg:px-10 font-semibold text-lg text-primary mb-4'>Senin</h1>
                    <div className='flex flex-wrap gap-4 lg:gap-8 px-4 lg:px-10 mb-6'>
                        {senins.length > 0 ? senins.map(senin => (
                            <CardDaftarAnime
                                key={senin._id}
                                film={senin}
                                eid={senin._id}
                                coverImg={senin.poster}
                                title={senin.title.substring(0, 40)}
                            />
                        )) : (
                            <div>
                                Tidak ada anime tayang hari ini.
                            </div>
                        )}
                    </div>
                    <h1 className='px-6 lg:px-10 font-semibold text-lg text-primary mb-4'>Selasa</h1>
                    <div className='flex flex-wrap gap-4 lg:gap-8 px-4 lg:px-10 mb-6'>
                        {selasas.length > 0 ? selasas.map(selasa => (
                            <CardDaftarAnime
                                key={selasa._id}
                                film={selasa}
                                eid={selasa._id}
                                coverImg={selasa.poster}
                                title={selasa.title.substring(0, 40)}
                            />
                        )) : (
                            <div>
                                Tidak ada anime tayang hari ini.
                            </div>
                        )}
                    </div>
                    <h1 className='px-6 lg:px-10 font-semibold text-lg text-primary mb-4'>Rabu</h1>
                    <div className='flex flex-wrap gap-4 lg:gap-8 px-4 lg:px-10 mb-6'>
                        {rabus.length > 0 ? rabus.map(rabu => (
                            <CardDaftarAnime
                                key={rabu._id}
                                film={rabu}
                                eid={rabu._id}
                                coverImg={rabu.poster}
                                title={rabu.title.substring(0, 40)}
                            />
                        )) : (
                            <div>
                                Tidak ada anime tayang hari ini.
                            </div>
                        )}
                    </div>
                    <h1 className='px-6 lg:px-10 font-semibold text-lg text-primary mb-4'>Kamis</h1>
                    <div className='flex flex-wrap gap-4 lg:gap-8 px-4 lg:px-10 mb-6'>
                        {kamiss.length > 0 ? kamiss.map(kamis => (
                            <CardDaftarAnime
                                key={kamis._id}
                                film={kamis}
                                eid={kamis._id}
                                coverImg={kamis.poster}
                                title={kamis.title.substring(0, 40)}
                            />
                        )) : (
                            <div>
                                Tidak ada anime tayang hari ini.
                            </div>
                        )}
                    </div>
                    <h1 className='px-6 lg:px-10 font-semibold text-lg text-primary mb-4'>Jumat</h1>
                    <div className='flex flex-wrap gap-4 lg:gap-8 px-4 lg:px-10 mb-6'>
                        {jumats.length > 0 ? jumats.map(jumat => (
                            <CardDaftarAnime
                                key={jumat._id}
                                film={jumat}
                                eid={jumat._id}
                                coverImg={jumat.poster}
                                title={jumat.title.substring(0, 40)}
                            />
                        )) : (
                            <div>
                                Tidak ada anime tayang hari ini.
                            </div>
                        )}
                    </div>
                    <h1 className='px-6 lg:px-10 font-semibold text-lg text-primary mb-4'>Sabtu</h1>
                    <div className='flex flex-wrap gap-4 lg:gap-8 px-4 lg:px-10 mb-6'>
                        {sabtus.length > 0 ? sabtus.map(sabtu => (
                            <CardDaftarAnime
                                key={sabtu._id}
                                film={sabtu}
                                eid={sabtu._id}
                                coverImg={sabtu.poster}
                                title={sabtu.title.substring(0, 40)}
                            />
                        )) : (
                            <div>
                                Tidak ada anime tayang hari ini.
                            </div>
                        )}
                    </div>
                    <h1 className='px-6 lg:px-10 font-semibold text-lg text-primary mb-4'>Minggu</h1>
                    <div className='flex flex-wrap gap-4 lg:gap-8 px-4 lg:px-10 mb-6'>
                        {minggus.length > 0 ? minggus.map(minggu => (
                            <CardDaftarAnime
                                key={minggu._id}
                                film={minggu}
                                eid={minggu._id}
                                coverImg={minggu.poster}
                                title={minggu.title.substring(0, 40)}
                            />
                        )) : (
                            <div>
                                Tidak ada anime tayang hari ini.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default JadwalTayang