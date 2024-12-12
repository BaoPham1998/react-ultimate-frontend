import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const BookInfo = (props) => {

    const { openBookDrawer
        , onClose, bookInfo, VND } = props;


    return (
        <>
            <Drawer title="Chi tiết Book"
                onClose={onClose}
                open={openBookDrawer}
                maskClosable={false}>
                {bookInfo ? <>
                    <p>Id : {bookInfo._id}</p><br />
                    <p>Tiêu đề: {bookInfo.mainText}</p><br />
                    <p>Tác giả: {bookInfo.author}</p><br />
                    <p>Thể loại: {bookInfo.category}</p><br />
                    <p>Giá tiền: {VND.format(bookInfo.price)}</p><br />
                    <p>Số lượng: {bookInfo.quantity}</p><br />
                    <p>Đã bán: {bookInfo.sold}</p><br />
                    <div>
                        <span>Thumnail:</span>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookInfo.thumbnail}`}
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: 'contain',
                                marginTop: "20px"
                            }}></img>
                    </div>
                </> :

                    <div>không tìm thấy book </div>
                }

            </Drawer>
        </>
    )
}

export default BookInfo