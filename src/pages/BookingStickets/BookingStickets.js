import React, { Fragment, useEffect, useRef, useState } from 'react';
import './BookingStickets.css';
import ListBooked from './ListBooked/ListBooked';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getMovieShowtimeInfo, getSticketAction } from '../../redux/actions/BookingSticketsAction';
import logo from './../../asset/images/logo.png';
import screen from './../../asset/images/screen.png';
import { Menu, Dropdown, Select, Modal, Button, Alert } from 'antd';
import { OrderedListOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { STICKETINFO, TOKEN, TYPE_USER, USERLOGIN } from '../../util/setting';
import { history } from '../../App';
import { getInfoCinema } from '../../redux/actions/ListCinemaAction';
const { Option } = Select;


export default function BookingStickets(props) {
    const { listMovieShowtime, listSeatBooking, isLoading } = useSelector(state => state.BookingSticketsReducer);
    const { cinemaList } = useSelector(state => state.ListCinemasReducer)
    const { userName, userType } = useSelector(state => state.UserReducer);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const maLichChieu = props.match.params.maLichChieu;
    const getPath = props.match.url;
    const path = getPath.split("/");
    const maHeThongRap = path[2];
    let user = localStorage.getItem(USERLOGIN) ? JSON.parse(localStorage.getItem(USERLOGIN)) : '';
    const dispatch = useDispatch();
    let myInterval = useRef();
    const startTime = () => {
        myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    showModal();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
    }
    useEffect(() => {
        if (Object.entries(cinemaList).length === 0 || listMovieShowtime === "") {
            dispatch(getMovieShowtimeInfo(maLichChieu));
            dispatch(getInfoCinema(maHeThongRap));
        }
        if (cinemaList !== "") {
            startTime();
            return () => {
                clearInterval(myInterval);
            };

        }
    }, [seconds, listMovieShowtime]);
    // for modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleGetSticket, setIsModalVisibleGetSticket] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOkGetSticket = () => {
        setIsModalVisibleGetSticket(false);
        if (listSeatBooking.length == 0) {
            Swal.fire({
                title: 'B???n Ch??a Ch???n Gh???!',
                text: 'Vui L??ng Ch???n Gh??? Tr?????c Khi ?????t!',
                icon: 'warning',
                confirmButtonColor: '#fb4226',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                title: 'B???n c?? ch???c mu???n ?????t v?? kh??ng!',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#fb4226',
                cancelButtonColor: 'rgb(167 167 167)',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
                    var dt = new Date();
                    let date = `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
                    // D??? li???u t???ng h???p ????ng ?????nh d???ng backend y??u c???u
                    let objectApi = {
                        "maLichChieu": props.match.params.maLichChieu,
                        "danhSachVe": listSeatBooking,
                        "taiKhoanNguoiDung": userLogin.taiKhoan
                    }
                    let objectListBooked = {
                        "danhSachVe": listSeatBooking,
                        "email": user.email,
                        "tenPhim": listMovieShowtime?.thongTinPhim.tenPhim,
                        "hinhAnh": listMovieShowtime?.thongTinPhim.hinhAnh,
                        "tenCumRap": listMovieShowtime?.thongTinPhim.tenCumRap,
                        "tenRap": listMovieShowtime?.thongTinPhim.tenRap,
                        "ngayGioMuaVe": date,
                        "ngayChieuGioChieu": `${listMovieShowtime?.thongTinPhim.ngayChieu}-${listMovieShowtime?.thongTinPhim.gioChieu}`
                    }
                    // let dataListBooked = [];
                    // dataListBooked.push(objectListBooked);
                    const action = getSticketAction(objectApi, objectListBooked, maLichChieu);
                    dispatch(action);
                }
            })

        }
    }
    const handleCancelGetSticket = () => {
        setIsModalVisibleGetSticket(false);
    }
    const handleOk = () => {
        setIsModalVisible(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        history.push("/");
    };
    const handleMenuClick = (e) => {
        if (e.key == 1) {
            localStorage.removeItem(USERLOGIN);
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(STICKETINFO);
            localStorage.removeItem(TYPE_USER);
            history.push("/");
        }
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="2" icon={<OrderedListOutlined />}>
                Danh s??ch v?? ???? ?????t
            </Menu.Item>
            <Menu.Item key="1" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>

        </Menu>
    );
    const listChar = [
        { number: 16, char: 'A' },
        { number: 32, char: 'B' },
        { number: 48, char: 'C' },
        { number: 64, char: 'D' },
        { number: 80, char: 'E' },
        { number: 96, char: 'F' },
        { number: 112, char: 'G' },
        { number: 128, char: 'H' },
        { number: 144, char: 'I' },
        { number: 160, char: 'J' },
    ]
    const setNameSeat = (index) => {
        let result;
        for (let i = 0; i < listChar.length; i++) {
            if (index <= listChar[i].number && index >= listChar[i].number - 15) {
                let h = 0;
                let indexSeat;
                for (let j = listChar[i].number - 16; j <= listChar[i].number; j++) {
                    if (index == j) {
                        indexSeat = h;
                        break;
                    }
                    h++;
                }
                if (indexSeat < 10) {
                    result = ` ${listChar[i].char}0${indexSeat}`;
                } else {
                    result = ` ${listChar[i].char}${indexSeat}`;
                }
            }
        }
        return result;
    }
    const seatBooking = (seat) => {
        if (listSeatBooking.length < 5) {
            dispatch({
                type: 'SEAT_BOOKING',
                seatBooking: seat
            })
        }
        else {
            for (let i = 0; i < listSeatBooking.length; i++) {
                if (seat.maGhe == listSeatBooking[i].maGhe) {
                    dispatch({
                        type: 'SEAT_BOOKING',
                        seatBooking: seat
                    })
                    return
                }
            }
            Swal.fire({
                title: '?????t T???i ??a 5 V?? 1 L???n!',
                icon: 'warning',
                confirmButtonColor: '#fb4226',
                confirmButtonText: 'OK'
            })

        }
    }
    const renderSeats = () => {
        let result = [];
        let arrSeat = listMovieShowtime.danhSachGhe;
        for (let i = 0; i <= arrSeat?.length; i = i + 16) {
            let a = 'A';
            let arrData = <div key={i} className="listSeatRow"><span style={{ marginRight: '20px', width: '20px', fontSize: '20px', fontWeight: '600' }}>{listChar.map((c, indexc) => {
                if (c.number == i) {
                    return c.char;
                }
            })}</span>
                {arrSeat.map((v, index) => {
                    let indexGheDD = listSeatBooking.findIndex(gheDD => gheDD.maGhe === v.maGhe);
                    let classSeatBooking = '';
                    if (indexGheDD !== -1) {
                        classSeatBooking = 'seatBooking';
                    }
                    let classSeatVIPBooked = v.daDat ? v.loaiGhe === 'Vip' ? 'seatVIPBooked' : '' : '';
                    let classSeatBooked = v.daDat ? 'seatBooked' : '';
                    let classSeatVIP = v.loaiGhe === 'Vip' ? 'seatVIP' : '';
                    if (index <= i - 1 && index >= i - 16) {
                        return <button key={index} onClick={() => seatBooking(v)} disabled={v.daDat} className={`text-center seat ${classSeatVIP} ${classSeatBooking} ${classSeatBooked} ${classSeatVIPBooked}`}>{v.daDat ? 'X' : listSeatBooking.map((g, indexG) => {
                            if (g.maGhe == v.maGhe) {
                                return <span>{setNameSeat(v.tenGhe)}</span>
                            } else {
                                return '';
                            }
                        })}</button>
                    }
                })}
            </div>
            result.push(arrData);
        }
        return result;
    }
    if (localStorage.getItem(USERLOGIN)) {
        if (isLoading) {
            return <Loader />
        } else {
            return (
                <div className="bookingSticket">
                    <div className="row" style={{ margin: '0', height: '100%' }}>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-9" style={{ height: '100%', padding: '0' }}>
                            <div className="bookingNav">
                                <div>
                                    <ul className="nav nav-tabs bookingNavItems" role="tablist">
                                        <NavLink to="/"><img className="bookingNavLogo" src={logo} /></NavLink>
                                        <li className="nav-item">
                                            <a className="nav-link active" id="choose-tab" data-toggle="tab" href="#choose" role="tab" aria-controls="choose" aria-selected="true">01 Ch???n Gh??? V?? Thanh To??n</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="reserved-tab" data-toggle="tab" href="#reserved" role="tab" aria-controls="reserved" aria-selected="false">02 K???t Qu??? ?????t V??</a>
                                        </li>
                                        <li className="user hideOnMobile">
                                            <Dropdown.Button className="user" overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                                                {userName}
                                            </Dropdown.Button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="bookingTab">
                                        {/* DANH S??CH GH??? */}
                                        <div className="tab-pane fade show active" id="choose" role="tabpanel" aria-labelledby="choose-tab">
                                            <div className="row bookingTitle">
                                                <div className="bookingInfo">
                                                    <div className="infoCinema">
                                                        <img src={cinemaList?.imgCinema} />
                                                        <div className="infoCinemaDetail">
                                                            <div className="nameCinema">{listMovieShowtime?.thongTinPhim?.tenCumRap}</div>
                                                            <div className="cinemaTime">
                                                                {listMovieShowtime?.thongTinPhim?.diaChi}
                                                            </div>
                                                        </div>
                                                        <div className="timeCountDown" >
                                                            <div className="timeTitle">
                                                                Th???i Gian Gi??? Gh???
                                                            </div>
                                                            <div className="timeDown">
                                                                {minutes === 0 && seconds === 0
                                                                    ? <h1> 00:00</h1>
                                                                    : <h1> 0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="screenBooking">
                                                <img src={screen} />
                                            </div>
                                            <div className="bookingSeat" style={{ textAlign: 'center' }}>
                                                {renderSeats()}
                                            </div>
                                            <div className="typeSeat row">
                                                <div className="typeSeatItem col-4 col-sm-4 col-md-4 col-lg-2">
                                                    <div className="colorSeat " style={{ backgroundColor: '#3e515d ' }}></div>
                                                    <div className="seatNote">Gh??? Th?????ng</div>
                                                </div>
                                                <div className="typeSeatItem col-4 col-sm-4 col-md-4 col-lg-2">
                                                    <div className="colorSeat" style={{ backgroundColor: '#f7b500' }}></div>
                                                    <div className="seatNote">Gh??? VIP</div>
                                                </div>
                                                <div className="typeSeatItem col-4 col-sm-4 col-md-4 col-lg-2">
                                                    <div className="colorSeat" style={{ backgroundColor: 'greenyellow' }}></div>
                                                    <div className="seatNote">Gh??? ??ang Ch???n</div>
                                                </div>
                                                <div className="typeSeatItem col-4 col-sm-4 col-md-4 col-lg-2" >
                                                    <div className="colorSeat" style={{ backgroundColor: '#ccc' }}></div>
                                                    <div className="seatNote">Gh??? Th?????ng ???? B??n</div>
                                                </div>
                                                <div className="typeSeatItem col-4 col-sm-4 col-md-4 col-lg-2">
                                                    <div className="colorSeat" style={{ backgroundColor: '#ef533b' }}></div>
                                                    <div className="seatNote">Gh??? VIP ???? B??n</div>
                                                </div>
                                            </div>
                                            <button onClick={() => {
                                                setIsModalVisibleGetSticket(true)
                                            }} className="buttonContinue">TI???P T???C</button>
                                        </div>
                                        {/* DANH S??CH GH??? ???? ?????T*/}
                                        <div className="tab-pane fade" id="reserved" role="tabpanel" aria-labelledby="reserved-tab">
                                            <ListBooked />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-3 buySticket hideOnMobile">
                            <div className="total">
                                {listSeatBooking.reduce((tongTien, seat, index) => {
                                    return tongTien += seat.giaVe;
                                }, 0).toLocaleString()}VN??
                            </div>
                            <div className="filmInfo">
                                <div className="nameFilm">
                                    <span className="typeFilm">C12</span>
                                    {listMovieShowtime?.thongTinPhim?.tenPhim}
                                </div>
                                <img className="imgFilm" src={listMovieShowtime?.thongTinPhim?.hinhAnh} />
                            </div>
                            <div className="seatBookings">
                                <div className="title ">
                                    Gh???: {listSeatBooking.map((seat, index) => {
                                        return <span className="seatNameBooking" key={index} className="mr-2">{setNameSeat(seat.stt)},</span>
                                    })}
                                </div>
                                <div className="totalMoney ">
                                    {listSeatBooking.reduce((tongTien, seat, index) => {
                                        return tongTien += seat.giaVe;
                                    }, 0).toLocaleString()}VN??
                                </div>

                            </div>
                            <div className="infoBookingFilm ">
                                <div className="title">
                                    Ng??y Gi??? Chi???u:
                                </div>
                                <div className="content">
                                    {listMovieShowtime?.thongTinPhim?.ngayChieu}-{listMovieShowtime?.thongTinPhim?.gioChieu}
                                </div>
                            </div>
                            <div className="infoBookingFilm">
                                <div className="title">
                                    C???m R???p:
                                </div>
                                <div className="content">
                                    {listMovieShowtime?.thongTinPhim?.tenCumRap}
                                </div>
                            </div>
                            <div className="infoBookingFilm">
                                <div className="title">
                                    T??n R???p:
                                </div>
                                <div className="content">
                                    {listMovieShowtime?.thongTinPhim?.tenRap}
                                </div>
                            </div>
                            <div className="infoUser">
                                <div className="title">
                                    H??? T??n Kh??ch H??ng:
                                </div>
                                <div className="content">
                                    {user.hoTen}
                                </div>
                            </div>
                            <div className="infoUser">
                                <div className="title">
                                    Email:
                                </div>
                                <div className="content">
                                    {user.email}
                                </div>
                            </div>
                            <div className="infoUser">
                                <div className="title">
                                    S??? ??i???n Tho???i:
                                </div>
                                <div className="content">
                                    {user.soDT}
                                </div>
                            </div>
                            <button onClick={() => {
                                if (listSeatBooking.length == 0) {
                                    Swal.fire({
                                        title: 'B???n Ch??a Ch???n Gh???!',
                                        text: 'Vui L??ng Ch???n Gh??? Tr?????c Khi ?????t!',
                                        icon: 'warning',
                                        confirmButtonColor: '#fb4226',
                                        confirmButtonText: 'OK'
                                    })
                                } else {
                                    Swal.fire({
                                        title: 'B???n c?? ch???c mu???n ?????t v?? kh??ng!',
                                        icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonColor: '#fb4226',
                                        cancelButtonColor: 'rgb(167 167 167)',
                                        confirmButtonText: 'OK'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
                                            var dt = new Date();
                                            let date = `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
                                            // D??? li???u t???ng h???p ????ng ?????nh d???ng backend y??u c???u
                                            let objectApi = {
                                                "maLichChieu": props.match.params.maLichChieu,
                                                "danhSachVe": listSeatBooking,
                                                "taiKhoanNguoiDung": userLogin.taiKhoan
                                            }
                                            let objectListBooked = {
                                                "danhSachVe": listSeatBooking,
                                                "email": user.email,
                                                "tenPhim": listMovieShowtime?.thongTinPhim.tenPhim,
                                                "hinhAnh": listMovieShowtime?.thongTinPhim.hinhAnh,
                                                "tenCumRap": listMovieShowtime?.thongTinPhim.tenCumRap,
                                                "tenRap": listMovieShowtime?.thongTinPhim.tenRap,
                                                "ngayGioMuaVe": date,
                                                "ngayChieuGioChieu": `${listMovieShowtime?.thongTinPhim.ngayChieu}-${listMovieShowtime?.thongTinPhim.gioChieu}`
                                            }
                                            // let dataListBooked = [];
                                            // dataListBooked.push(objectListBooked);
                                            const action = getSticketAction(objectApi, objectListBooked, maLichChieu);
                                            dispatch(action);
                                        }
                                    })

                                }
                            }} className="btnGetSticket">?????T V??</button>
                        </div>
                    </div>
                    <Modal className="getSticketModal" title={<div className="modalTitle">
                        <img className="modalImg" src={logo} />
                        <span className="modalInform">TH??NG TIN V??</span>
                    </div>} visible={isModalVisibleGetSticket} okText="?????T V??" onOk={handleOkGetSticket} onCancel={handleCancelGetSticket} >
                        <div className="getSticketMobileInfo">
                            <div className="total">
                                {listSeatBooking.reduce((tongTien, seat, index) => {
                                    return tongTien += seat.giaVe;
                                }, 0).toLocaleString()}VN??
                            </div>
                            <div className="filmInfo">
                                <div className="nameFilm">
                                    <span className="typeFilm">C12</span>
                                    {listMovieShowtime?.thongTinPhim?.tenPhim}
                                </div>
                                <img className="imgFilm" src={listMovieShowtime?.thongTinPhim?.hinhAnh} />
                            </div>
                            <div className="seatBookings">
                                <div className="title ">
                                    Gh???: {listSeatBooking.map((seat, index) => {
                                        return <span className="seatNameBooking" key={index} className="mr-2">{setNameSeat(seat.stt)},</span>
                                    })}
                                </div>
                                <div className="totalMoney ">
                                    {listSeatBooking.reduce((tongTien, seat, index) => {
                                        return tongTien += seat.giaVe;
                                    }, 0).toLocaleString()}VN??
                                </div>

                            </div>
                            <div className="infoBookingFilm ">
                                <div className="title">
                                    Ng??y Gi??? Chi???u:
                                </div>
                                <div className="content">
                                    {listMovieShowtime?.thongTinPhim?.ngayChieu}-{listMovieShowtime?.thongTinPhim?.gioChieu}
                                </div>
                            </div>
                            <div className="infoBookingFilm">
                                <div className="title">
                                    C???m R???p:
                                </div>
                                <div className="content">
                                    {listMovieShowtime?.thongTinPhim?.tenCumRap}
                                </div>
                            </div>
                            <div className="infoBookingFilm">
                                <div className="title">
                                    T??n R???p:
                                </div>
                                <div className="content">
                                    {listMovieShowtime?.thongTinPhim?.tenRap}
                                </div>
                            </div>
                            <div className="infoUser">
                                <div className="title">
                                    H??? T??n Kh??ch H??ng:
                                </div>
                                <div className="content">
                                    {user.hoTen}
                                </div>
                            </div>
                            <div className="infoUser">
                                <div className="title">
                                    Email:
                                </div>
                                <div className="content">
                                    {user.email}
                                </div>
                            </div>
                            <div className="infoUser">
                                <div className="title">
                                    S??? ??i???n Tho???i:
                                </div>
                                <div className="content">
                                    {user.soDT}
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal title={<div className="modalTitle">
                        <img className="modalImg" src={logo} />
                        <span className="modalInform">TH??NG B??O</span>
                    </div>} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Alert
                            message="Qu?? th???i gian gi??? gh???, vui l??ng ?????t l???i!!"
                            type="warning"
                            showIcon
                        />
                    </Modal>
                </div>
            )
        }

    } else {
        return <Redirect to="/" />
    }


}
