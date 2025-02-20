package com.social.net.dto;

/**
 * Lớp đại diện cho cấu trúc phản hồi API chuẩn
 * @param <T> Kiểu dữ liệu của đối tượng data
 */
public class CustomAPIResponse<T> {
    private String status;
    private String message;
    private T data;

    /**
     * Constructor mặc định
     */
    public CustomAPIResponse() {
    }

    /**
     * Constructor với tất cả tham số
     *
     * @param status Trạng thái của phản hồi (success/error)
     * @param message Thông điệp phản hồi
     * @param data Dữ liệu phản hồi
     */
    public CustomAPIResponse(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    /**
     * Tạo phản hồi thành công
     *
     * @param message Thông điệp thành công
     * @param data Dữ liệu trả về
     * @return Đối tượng CustomAPIResponse
     */
    public static <T> CustomAPIResponse<T> success(String message, T data) {
        return new CustomAPIResponse<>("success", message, data);
    }

    /**
     * Tạo phản hồi thành công chỉ với dữ liệu
     *
     * @param data Dữ liệu trả về
     * @return Đối tượng CustomAPIResponse
     */
    public static <T> CustomAPIResponse<T> success(T data) {
        return new CustomAPIResponse<>("success", "Thao tác thành công", data);
    }

    /**
     * Tạo phản hồi lỗi
     *
     * @param message Thông báo lỗi
     * @return Đối tượng CustomAPIResponse
     */
    public static <T> CustomAPIResponse<T> error(String message) {
        return new CustomAPIResponse<>("error", message, null);
    }

    // Getters và Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}