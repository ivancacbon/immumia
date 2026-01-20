// ==========================================
// NETLIFY SERVERLESS FUNCTION
// Send Telegram Notification
// ==========================================

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({
                success: false,
                message: 'Method not allowed'
            })
        };
    }

    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Parse request body
        const data = JSON.parse(event.body);
        
        // Validate required fields
        if (!data.fullName || !data.phone || !data.message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Missing required fields: fullName, phone, or message'
                })
            };
        }

        // Get environment variables
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        // Check if credentials are configured
        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Missing Telegram credentials in environment variables');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Server configuration error. Please contact administrator.'
                })
            };
        }

        // Format local datetime
        const now = new Date();
        const localDateTime = now.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Format page name
        const pageName = data.page || 'unknown';
        const pageDisplay = pageName === 'index' || pageName === 'home' 
            ? 'Trang chủ' 
            : pageName === 'product'
            ? 'Chi tiết sản phẩm'
            : pageName;

        // Format Telegram message
        const telegramMessage = `🌱 YÊU CẦU TƯ VẤN MỚI

👤 Tên: ${data.fullName}
📞 SĐT: ${data.phone}
📋 Nội dung:
${data.message}

⏰ Thời gian: ${localDateTime}
🌐 Trang: ${pageDisplay}`;

        // Send message to Telegram
        const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();

        if (result.ok) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Consultation request sent successfully'
                })
            };
        } else {
            console.error('Telegram API error:', result);
            throw new Error('Failed to send message to Telegram');
        }

    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Internal server error. Please try again later.'
            })
        };
    }
};
