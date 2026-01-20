// ==========================================
// PRODUCT DATA
// ==========================================
const productData = {
    'cholesterol-plus': {
        title: 'Mía Cholesterol Plus',
        image: '/image/product-4.jpeg',
        description: 'Sản phẩm hỗ trợ điều hòa cholesterol tự nhiên với Policosanol chiết xuất từ sáp mía nguyên chất. Giúp cải thiện sức khỏe tim mạch và tuần hoàn máu một cách an toàn, hiệu quả.',
        form: 'Thanh',
        spec: '60 thanh /hộp',
        ingredients: [
            'Yến mạch',
            'Đậu phộng',
            'Mía',
        ],
        benefits: [
            'Hỗ trợ điều hòa cholesterol trong máu',
            'Cải thiện tuần hoàn máu và sức khỏe tim mạch',
            'Giảm nguy cơ xơ vữa động mạch',
            'Tăng cường HDL (cholesterol tốt)',
            'Bảo vệ thành mạch máu khỏi tổn thương'
        ],
        targetUsers: 'Người có cholesterol cao, người trung niên và người cao tuổi quan tâm đến sức khỏe tim mạch, người có nguy cơ bệnh tim mạch.',
        usage: 'Tối đa 2 thanh/ngày, dùng sau bữa ăn. Uống nhiều nước trong ngày để hỗ trợ quá trình hấp thu dưỡng chất.'
    },
    'antioxidant-pro': {
        title: 'Mía Beauty Cream',
        image: '/image/product-3.jpeg',
        description: 'Kem dưỡng da cao cấp với chiết xuất mía tự nhiên, giúp dưỡng ẩm sâu, chống lão hóa và phục hồi làn da từ bên trong. Kết hợp polyphenol và flavonoid mang lại làn da khỏe mạnh, tươi trẻ.',
        form: 'Kem dưỡng da',
        spec: '50ml/hũ (45 ngày sử dụng)',
        ingredients: [
            'Chiết xuất mía (Polyphenol) 5%',
            'Flavonoid từ mía 3%',
            'Hyaluronic Acid',
            'Vitamin E & C',
            'Niacinamide 5%'
        ],
        benefits: [
            'Dưỡng ẩm sâu, giữ da mềm mịn suốt ngày',
            'Chống oxi hóa, làm chậm quá trình lão hóa da',
            'Cải thiện độ đàn hồi và săn chắc da',
            'Giảm thâm nám, tàn nhang, đều màu da',
            'Bảo vệ da khỏi tác hại môi trường'
        ],
        targetUsers: 'Mọi loại da, đặc biệt phù hợp với da khô, da lão hóa, da thiếu sức sống. Phù hợp cho cả nam và nữ từ 25 tuổi trở lên.',
        usage: 'Thoa đều lên mặt và cổ sau khi làm sạch da, sáng và tối. Massage nhẹ nhàng cho đến khi kem thấm hoàn toàn. Sử dụng đều đặn để đạt hiệu quả tốt nhất.'
    },
    'prebiotic-care': {
        title: 'Mía Prebiotic Care',
        image: '/image/product-1.jpeg',
        imageHover: '/image/product-2.jpeg',
        description: 'Sản phẩm hỗ trợ cân bằng hệ vi sinh đường ruột với oligosaccharide từ mía tự nhiên. Cải thiện tiêu hóa, tăng cường hấp thu dinh dưỡng và nâng cao sức đề kháng từ hệ miễn dịch đường ruột.',
        form: 'Bột hòa tan',
        spec: '30 gói x 5g (30 ngày dùng)',
        ingredients: [
            'Oligosaccharide từ mía 3000mg',
            'Inulin 1000mg',
            'Lactobacillus (5 tỷ CFU)',
            'Bifidobacterium (3 tỷ CFU)',
            'Men tiêu hóa enzyme'
        ],
        benefits: [
            'Cải thiện hệ vi sinh đường ruột tự nhiên',
            'Hỗ trợ tiêu hóa, giảm táo bón và đầy hơi',
            'Tăng cường hấp thu vitamin và khoáng chất',
            'Nâng cao hệ miễn dịch từ đường ruột',
            'Giảm nguy cơ viêm đại tràng'
        ],
        targetUsers: 'Người bị rối loạn tiêu hóa, táo bón mạn tính, người sau điều trị kháng sinh, người muốn tăng cường hệ miễn dịch, trẻ em trên 12 tuổi có vấn đề tiêu hóa.',
        usage: 'Hòa 1 gói (5g) vào 150ml nước ấm, khuấy đều và uống trước bữa ăn sáng 15-30 phút. Sử dụng đều đặn mỗi ngày để duy trì hệ vi sinh khỏe mạnh.'
    }
};

// ==========================================
// MODAL MANAGEMENT
// ==========================================
const modal = document.getElementById('consultationModal');
const consultationBtn = document.getElementById('consultationBtn');
const modalClose = document.getElementById('modalClose');
const consultationForm = document.getElementById('consultationForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// Open modal
function openConsultationModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeConsultationModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form after closing
    setTimeout(() => {
        consultationForm.reset();
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }, 300);
}

// Event listeners for modal
consultationBtn.addEventListener('click', openConsultationModal);
modalClose.addEventListener('click', closeConsultationModal);

// Close modal when clicking overlay
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
        closeConsultationModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeConsultationModal();
    }
});

// Make function globally accessible for product page
window.openConsultationModal = openConsultationModal;

// ==========================================
// FORM SUBMISSION
// ==========================================
consultationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate phone number
    if (!/^[0-9]{10,11}$/.test(formData.phone)) {
        showFormMessage('Số điện thoại không hợp lệ. Vui lòng nhập 10-11 chữ số.', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Send to Netlify Function
        const response = await fetch('/.netlify/functions/send-telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                page: getCurrentPageName()
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showFormMessage('✓ Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', 'success');
            
            // Auto close modal after 3 seconds
            setTimeout(() => {
                closeConsultationModal();
            }, 3000);
        } else {
            throw new Error(result.message || 'Có lỗi xảy ra');
        }
    } catch (error) {
        console.error('Error:', error);
        showFormMessage('⚠ Không thể gửi yêu cầu. Vui lòng thử lại hoặc liên hệ hotline.', 'error');
    } finally {
        setLoadingState(false);
    }
});

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function setLoadingState(isLoading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

function getCurrentPageName() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop() || 'index.html';
    return pageName.replace('.html', '') || 'home';
}

// ==========================================
// PRODUCT DETAIL PAGE LOGIC
// ==========================================
if (window.location.pathname.includes('product.html')) {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Load product data
    if (productId && productData[productId]) {
        const product = productData[productId];
        
        // Update page content
        const productIconElement = document.getElementById('productIcon');
        if (product.image) {
            // Replace placeholder with actual image
            productIconElement.innerHTML = `<img src="${product.image}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
        
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productForm').textContent = product.form;
        document.getElementById('productSpec').textContent = product.spec;
        
        // Update ingredients
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = product.ingredients
            .map(ingredient => `<div class="ingredient-item">${ingredient}</div>`)
            .join('');
        
        // Update benefits
        const benefitsList = document.getElementById('benefitsList');
        benefitsList.innerHTML = product.benefits
            .map(benefit => `<li>${benefit}</li>`)
            .join('');
        
        // Update target users
        document.getElementById('targetUsers').innerHTML = `<p>${product.targetUsers}</p>`;
        
        // Update usage instructions
        document.getElementById('usageInstructions').innerHTML = `<p>${product.usage}</p>`;
        
        // Update page title
        document.title = `${product.title} - IMMUNMÍA`;
    } else {
        // Product not found, show error
        document.querySelector('.product-detail').innerHTML = `
            <div class="container" style="text-align: center; padding: 4rem 0;">
                <h1 style="color: var(--text-secondary);">Không tìm thấy sản phẩm</h1>
                <p style="margin: 2rem 0;">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
                <a href="index.html" class="btn btn-primary">Quay về trang chủ</a>
            </div>
        `;
    }
}

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
