import React from 'react'
import cgv from './../../asset/images/icons/cgv.png';
import bhd from './../../asset/images/icons/bhd.png';
import galaxycine from './../../asset/images/icons/galaxycine.png';
import cinestar from './../../asset/images/icons/cinestar.png';
import lotte from './../../asset/images/icons/lotte.png';
import megags from './../../asset/images/icons/megags.png';
import bt from './../../asset/images/icons/bt.jpg';
import dongdacinema from './../../asset/images/icons/dongdacinema.png';
import TOUCH from './../../asset/images/icons/TOUCH.png';
import cnx from './../../asset/images/icons/cnx.jpg';
import STARLIGHT from './../../asset/images/icons/STARLIGHT.png';
import VCB from './../../asset/images/icons/VCB.png';
import VIETTINBANK from './../../asset/images/icons/VIETTINBANK.png';
import zalopay_icon from './../../asset/images/icons/zalopay_icon.png';
import zion from './../../asset/images/icons/zion-logo.jpg';
import payoo from './../../asset/images/icons/payoo.jpg';
import laban from './../../asset/images/icons/laban.png';
import AGRIBANK from './../../asset/images/icons/AGRIBANK.png';
import dcine from './../../asset/images/icons/dcine.png';
import IVB from './../../asset/images/icons/IVB.png';
import android from './../../asset/images/icons/android-logo.png';
import apple from './../../asset/images/icons/apple-logo.png';
import facebook from './../../asset/images/icons/facebook-logo.png';
import zalo from './../../asset/images/icons/zalo-logo.png';
import bocongthuong from './../../asset/images/icons/bocongthuong.png';

export default function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="container">
                <div className="row footer__info">
                    <div className="col-12 col-sm-12 col-md-4 footer__detail">
                        <p id="footerTitleTix" className="footer__title">TIX</p>
                        <div className="row">
                            <div className="col-5 pr-0 hideOnMobile">
                                <a target="blank" href="https://tix.vn/faq">FAQ</a><br />
                                <a target="blank" href="https://tix.vn/brand-guideline/">Brand Guidelines</a>
                            </div>
                            <div className="col-6 pl-0 hideOnMobile">
                                <a target="blank" href="https://tix.vn/thoa-thuan-su-dung">Thỏa thuận sử dụng</a><br />
                                <a target="blank" href="https://tix.vn/chinh-sach-bao-mat">Chính sách bảo mật</a>
                            </div>
                            <div className="col-12 hideOnPC">
                                <a target="blank" href="https://tix.vn/faq">FAQ</a><br />
                                <a target="blank" href="https://tix.vn/brand-guideline/">Brand Guidelines</a>
                                <a target="blank" href="https://tix.vn/thoa-thuan-su-dung">Thỏa thuận sử dụng</a><br />
                                <a target="blank" href="https://tix.vn/chinh-sach-bao-mat">Chính sách bảo mật</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 footer__partner hideOnMobile">
                        <p className="footer__title">ĐỐI TÁC</p>
                        <div className="col-12 row">
                            <a target="blank" href="https://www.cgv.vn/"><img src={cgv} style={{ backgroundColor: 'white' }} /></a>
                            <a target="blank" href="https://www.bhdstar.vn/"><img src={bhd} /></a>
                            <a target="blank" href="https://www.galaxycine.vn/"><img src={galaxycine} /></a>
                            <a target="blank" href="http://cinestar.com.vn/"><img src={cinestar} /></a>
                            <a target="blank" href="https://lottecinemavn.com/LCHS/index.aspx"><img src={lotte} /></a>
                        </div>
                        <div className="col-12 row">
                            <a target="blank" href="https://www.megagscinemas.vn/"><img src={megags} /></a>
                            <a target="blank" href="https://www.betacinemas.vn/home.htm"><img src={bt} /></a>
                            <a target="blank" href="http://ddcinema.vn/"><img src={dongdacinema} /></a>
                            <a target="blank" href="https://touchcinema.com/"><img src={TOUCH} /></a>
                            <a target="blank" href="https://cinemaxvn.com/"><img src={cnx} /></a>
                        </div>
                        <div className="col-12 row">
                            <a target="blank" href="http://starlight.vn/"><img src={STARLIGHT} /></a>
                            <a target="blank" href="https://portal.vietcombank.com.vn/Pages/Home.aspx?devicechannel=default"><img src={VCB} /></a>
                            <a target="blank" href="https://www.vietinbank.vn/web/home/vn/index.html"><img src={VIETTINBANK} /></a>
                            <a target="blank" href="https://zalopay.vn/"><img src={zalopay_icon} /></a>
                            <a target="blank" href="https://webv3.123go.vn/"><img src="https://tix.vn/app/assets/img/icons/123go.png" /></a>
                        </div>
                        <div className="col-12 row">
                            <a target="blank" href="https://www.payoo.vn/"><img src={payoo} /></a>
                            <a target="blank" href="https://laban.vn/"><img src={laban} /></a>
                            <a target="blank" href="https://www.agribank.com.vn/"><img src={AGRIBANK} /></a>
                            <a target="blank" href="https://www.dcine.vn/"><img src={dcine} /></a>
                            <a target="blank" href="https://www.indovinabank.com.vn/"><img src={IVB} /></a>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 footer__app ">
                        <div className="col-6 hideOnMobile">
                            <p className="footer__title ">MOBILE APP</p>
                            <a target="blank" href="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197"><img src={apple} /></a>
                            <a target="blank" href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"><img src={android} /></a>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 footer__social">
                            <p className="footer__title hideOnMobile">SOCIAL</p>
                            <a target="blank" href="https://www.facebook.com/tix.vn/"><img src={facebook} /></a>
                            <a target="blank" href="https://zalo.me/tixdatve"><img src={zalo} /></a>
                        </div>
                    </div>
                </div>
                <hr id="hrFooter" />
                <div className="row footer__add">
                    <div className="col-12 col-sm-12 col-md-1 p-0">
                        <img className="imgZion" src={zion} style={{ width: '100%', borderRadius: '10px', cursor: 'pointer' }} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 pr-0 address__detail">
                        <p className="footer__title">TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</p>
                        <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</p>
                        <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
                        <p>đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</p>
                        <p>Số Điện Thoại (Hotline): 1900 545 436 </p>
                        <p>Email: <a href="#" style={{ color: 'red' }}>support@tix.vn</a></p>
                    </div>
                    <div className="col-12 col-sm-12 col-md-2 p-0">
                        <a target="blank" href="http://online.gov.vn/Home/WebDetails/62782?AspxAutoDetectCookieSupport=1">
                            <img className="imgBoCo" src={bocongthuong} style={{ width: '100%', cursor: 'pointer' }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
