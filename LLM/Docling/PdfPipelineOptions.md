### 1. `PdfPipelineOptions` 핵심 파라미터 상세

이 옵션들은 `DocumentConverter`를 초기화할 때 인자로 전달되어, 파싱 과정에서 어떤 모델을 돌릴지 결정합니다.

#### **① 표(Table) 처리 관련**

- **`do_table_structure` (bool):** 기본값 `True`. PDF 내의 표를 감지하고 구조를 분석합니다. 이 옵션이 켜져 있어야 나중에 테이블을 Markdown으로 깔끔하게 변환할 수 있습니다.
    
- **`table_structure_options`:** 표 분석의 품질을 설정합니다.
    
    - `mode`: `TableFormerMode.ACCURATE` (정확도 우선) 또는 `FAST` (속도 우선) 중 선택할 수 있습니다.
        
- **`generate_table_images` (bool):** 표를 텍스트뿐만 아니라 개별 이미지 파일로도 추출할지 여부입니다.
    

#### **② 이미지 및 시각 요소(Picture/Figure) 처리 관련**

사용자님의 가장 큰 고민인 "이미지 맥락 단절" 문제를 해결하는 핵심 설정입니다.

- **`do_picture_description` (bool):** 이미지에 대한 **자동 설명 생성(VLM)** 기능을 활성화합니다. 이 옵션을 켜면 이미지가 단순한 '그림'이 아니라 '텍스트 설명'을 가진 객체가 되어 검색 품질이 올라갑니다.
    
- **`picture_description_options`:** 이미지 설명을 생성할 때 어떤 모델(Granite, SmolVLM 등)을 쓸지, 프롬프트는 무엇으로 할지 상세 설정합니다.
    
- **`generate_picture_images` (bool):** 문서 내 이미지를 개별 파일로 잘라서 저장할지 결정합니다.
    
- **`images_scale` (float):** 이미지 추출 시의 해상도 배율입니다. (예: 2.0으로 설정 시 기본보다 고해상도로 추출)
    

#### **③ OCR 및 텍스트 인식**

- **`do_ocr` (bool):** 스캔된 PDF나 텍스트 정보가 없는 이미지를 처리할 때 켭니다.
    
- **`ocr_options`:** 사용 언어(`lang=["kor", "eng"]`) 등을 지정할 수 있습니다. `Tesseract`나 `EasyOCR` 같은 엔진 설정을 여기서 합니다.
    
- **`force_backend_text` (bool):** PDF 파일에 텍스트 데이터가 있더라도 무시하고 레이아웃 엔진의 결과만 사용할지 결정합니다.
    

#### **④ 기타 고급 설정**

- **`do_formula_enrichment` (bool):** 수식을 감지하여 LaTeX 형식으로 변환할지 여부입니다.
    
- **`do_code_enrichment` (bool):** 코드 블록을 감지하여 보존할지 결정합니다.