import React, { useState, useEffect, useCallback, useRef } from 'react'
import bsCustomFileInput from 'bs-custom-file-input'
import $ from 'jquery'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Cookies from 'universal-cookie'
import swal from 'sweetalert'
import { connect } from 'react-redux'
import { uploadProfilePict } from '../../static/redux/Actions/user'

const cookies = new Cookies()

function getResizedCanvas(canvas, newWidth, newHeight) {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        newWidth,
        newHeight
    );

    return tmpCanvas;
}

const EditAvatar = props => {
    const pixelRatio = 4;
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 / 1 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const previewCanvasRef = useRef(null);

    const handleFileInput = (e) => {
        let file = document.getElementById(e.target.id).files[0]
        if (file?.type.substring(0, 5) == "image") {
            if (file.size / 1024 / 1024 <= 1) {
                if (e.target.files && e.target.files.length > 0) {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => setUpImg(reader.result));
                    reader.readAsDataURL(e.target.files[0]);
                }
            }
            else
                swal({
                    title: "Error!",
                    text: "Ukuran maksimum file 1MB!",
                    icon: "error",
                    button: "Okay!",
                })
        } else
            swal({
                title: "Error!",
                text: "Format file harus image!",
                icon: "error",
                button: "Okay!",
            })
    }

    function generateCroppedImage(previewCanvas, crop) {
        if (!crop || !previewCanvas) {
            return;
        }

        const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

        canvas.toBlob(
            blob => {
                const payload = new FormData()
                const img = new File([blob], 'PROFILE - ' + cookies.get('user').email, { type: blob.type })
                payload.append('picture', img)
                uploadProfilePict(props.dispatch, payload)
            },
            "image/png",
            1
        );
    }

    const onLoad = useCallback(img => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        $(document).ready(function () {
            bsCustomFileInput.init()
        })
    }, [])

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    const onSubmit = () => {
        generateCroppedImage(previewCanvasRef.current, completedCrop)
        props.modalToggleAvatar()
    }

    return (
        <div className='react-crop-image'>


            {upImg && <div className='row'>
                <div className='col-md d-flex flex-column align-items-center justify-content-center my-4'>
                    <h2 className='text-main'>Gambar Awal*</h2>
                    <h6 className='mb-3'>Geser box krop untuk memotong.</h6>
                    <ReactCrop
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={c => setCompletedCrop(c)}
                    />
                </div>
                <div className='col-md d-flex flex-column align-items-center justify-content-center my-4'>
                    <h2 className='text-main'>Hasil Krop*</h2>
                    <h6 className='mb-3'>Gambar akan disimpan sesuai dengan hasil krop.</h6>
                    <canvas className='rounded-circle'
                        ref={previewCanvasRef}
                        style={{
                            width: completedCrop?.width ?? 0,
                            height: completedCrop?.height ?? 0
                        }}
                    />
                </div>
            </div>}

            <div className='row'>
                <div className='col-md'>
                    <div class="form-group">
                        <label className='font-weight-bold text-white'>Pilih Foto Baru*</label>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile" onChange={handleFileInput} />
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                        <small class="form-text text-white">Max 1Mb dengan Format Image.</small>
                    </div>
                </div>
                <div className='col-md'>

                </div>
            </div>
            <button class='btn btn-main' disabled={!upImg} onClick={onSubmit} data-dismiss='modal'>Submit</button>
        </div>
    )
}

export default connect(state => ({
    user: state.user.user
}), null)(EditAvatar)