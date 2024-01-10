{"headers":{"Content-Type":["application/json"],"apiType":["kakao"]},"body":"{"id":3234209120,"connected_at":"2023-12-20T19:50:29Z","properties":{"profile_image":"http://k.kakaocdn.net/dn/5jlye/btsCR9MfTju/DNNjK30IEdfMG0RBr9V9Hk/img_640x640.jpg","thumbnail_image":"http://k.kakaocdn.net/dn/5jlye/btsCR9MfTju/DNNjK30IEdfMG0RBr9V9Hk/img_110x110.jpg"},"kakao_account":{"profile_image_needs_agreement":false,"profile":{"thumbnail_image_url":"http://k.kakaocdn.net/dn/5jlye/btsCR9MfTju/DNNjK30IEdfMG0RBr9V9Hk/img_110x110.jpg","profile_image_url":"http://k.kakaocdn.net/dn/5jlye/btsCR9MfTju/DNNjK30IEdfMG0RBr9V9Hk/img_640x640.jpg","is_default_image":false},"has_email":true,"email_needs_agreement":false,"is_email_valid":true,"is_email_verified":true,"email":"dnfwlq123@naver.com"}}","statusCode":"OK","statusCodeValue":200}


{"headers":{"apiType":["naver"],"Content-Type":["application/json"]},"body":"{\"resultcode\":\"00\",\"message\":\"success\",\"response\":{\"id\":\"-99QplHeuA1MoG1mTiwF_NOAjX_gEmd2NEY7z8mENko\",\"profile_image\":\"https:\\/\\/ssl.pstatic.net\\/static\\/pwe\\/address\\/img_profile.png\",\"email\":\"dnfwlq123@yahoo.co.kr\"}}","statusCode":"OK","statusCodeValue":200}

카카오
프로필 이미지 : body.kakao_account.profile.profile_image_url
썸네일 : body.kakao_account.profile.thumbnail_image_url
아이디 : body.id
이메일 : body.kakao_account.email

네이버
썸네일 이미지 : body.response.profile_image
아이디 : body.response.id
이메일 : body.response.email