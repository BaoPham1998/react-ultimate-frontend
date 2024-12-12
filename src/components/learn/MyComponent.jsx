
// <> fragment có chức năng không phá vỡ cấu trúc của css

import './style.css'

const MyComponent = () => {
    // const hoidanit = "baopham 1"; // string
    // const hoidanit = 25;  //number
    // const hoidanit = true; //true
    // const hoidanit = undefined; 
    // const hoidanit = null;
    const hoidanit = [1, 2, 3, 4];
    // const hoidanit = {
    //     name: "baopham",
    //     age: 17,
    // };
    return (
        <>
            <div> {JSON.stringify(hoidanit)} BAO PHAM & ERIC</div>
            <div className='child'
                style={
                    { borderRadius: "10px" }
                }
            >hahahaha</div>
        </>
    );
}

export default MyComponent;

// JSON.stringify JSON.stringify là một hàm JavaScript dùng để chuyển 
//đổi một đối tượng JavaScript (JavaScript object) hoặc một giá trị nào đó thành chuỗi 
//JSON (JSON string). Chuỗi JSON này có thể được gửi qua mạng hoặc lưu trữ trong cơ sở dữ liệu, sau đó có thể 
//được chuyển ngược lại thành đối tượng JavaScript bằng JSON.parse.