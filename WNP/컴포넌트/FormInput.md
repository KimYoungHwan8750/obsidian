```html
<div class="top_search col-12">
	<div class="search-area col-lg-12">
		<form id="frmMain" name="frmMain">
			<div class="search_cont">
				<form:input
					id="kyh"
					caption="test_caption"
					addAttr="maxlength='10'"
				/>
				<button
					class="btn test_btn btn-primary"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</div>
```

search-area는 없어도 정상적으로 css가 적용되지만 특별한 사유가 있는 것이 아니라면 그냥 쓰도록 하자