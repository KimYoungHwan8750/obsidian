역 API라고도 한다.
기존 API 방식은 서버와 주기적으로 통신을 해야 최신화된 정보를 제공받을 수 있었지만, 웹훅은 URL을 등록해놓으면 타겟 서버에서 해당 URL로 요청을 보내준다.
그러므로 우리는 상대 서버가 요청을 보냈을 때(정보가 갱신되었을 때) 원하는 로직을 실행시킬 수 있다.