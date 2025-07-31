# Slice Machine Management Guide

## 🚀 Quick Start

### **Các lệnh cơ bản:**

```bash
# Start Slice Machine (không lỗi experiments)
npm run slicemachine

# Hoặc sử dụng helper scripts
npm run sm:start

# Stop Slice Machine  
npm run sm:stop

# Restart Slice Machine
npm run sm:restart

# Check status
npm run sm:status
```

## 🔧 **Cấu hình đã fix:**

### **1. Environment Variables**
- ✅ `PRISMIC_REPOSITORY_NAME=artika-sapa` được set tự động
- ✅ Không cần tạo file `.env` thủ công

### **2. Server Configuration**
- ✅ Protocol: HTTP (không HTTPS)
- ✅ Port: 9999
- ✅ Host: localhost

### **3. Error Suppression**
- ✅ **Wrapper script** filter out experiment errors
- ✅ Disabled all experiments
- ✅ Disabled telemetry and analytics
- ✅ Clean output without ECONNREFUSED spam

### **4. Advanced Error Handling**
- ✅ `scripts/slicemachine-wrapper.js` - Node.js wrapper
- ✅ `scripts/slicemachine.sh` - Bash helper
- ✅ Auto environment setup
- ✅ Error filtering

## 🛠️ **Troubleshooting:**

### **Nếu vẫn thấy lỗi experiments (không ảnh hưởng):**
```bash
# Các lỗi [Experiment] ECONNREFUSED là bình thường
# Slice Machine vẫn hoạt động bình thường
# Chỉ là noise từ Prismic experiments
```

### **Nếu port bị chiếm:**
```bash
# Kill process trên port 9999
lsof -ti:9999 | xargs kill -9

# Start lại
npm run slicemachine
```

### **Nếu cần restart hoàn toàn:**
```bash
# Restart với delay
npm run sm:restart
```

## 📋 **Workflow thường dùng:**

### **Khi bắt đầu làm việc:**
```bash
npm run slicemachine
# Truy cập: http://localhost:9999
```

### **Khi gặp lỗi:**
```bash
npm run sm:restart
```

### **Khi kết thúc:**
```bash
npm run sm:stop
```

## 🎯 **Lợi ích:**

1. **✅ Không còn spam lỗi ECONNREFUSED**
2. **✅ Clean output**
3. **✅ Auto environment setup**
4. **✅ Easy management commands**
5. **✅ Status checking**
6. **✅ Auto-restart capability**

## 🔗 **Truy cập:**

- **Slice Machine UI**: http://localhost:9999
- **Next.js Dev**: http://localhost:3002

## 📝 **Lưu ý:**

- **Lỗi experiments là bình thường** - không ảnh hưởng chức năng
- Luôn dùng `npm run slicemachine` thay vì chạy trực tiếp
- Kiểm tra status trước khi start
- Restart nếu gặp lỗi kết nối thực sự
- Đảm bảo port 9999 không bị chiếm

## 🔍 **Files quan trọng:**

- `scripts/slicemachine-wrapper.js` - Node.js wrapper (filter errors)
- `scripts/slicemachine.sh` - Bash helper script
- `slicemachine.config.json` - Cấu hình Slice Machine
- `package.json` - Scripts

---

**✅ Đã fix hoàn toàn vấn đề ECONNREFUSED spam!** 