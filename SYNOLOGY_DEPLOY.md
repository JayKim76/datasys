
# Synology NAS 홈페이지 배포 가이드

이 가이드는 Docker를 사용하여 Synology NAS에서 Next.js 홈페이지를 실행하는 방법을 설명합니다.

## 사전 준비 사항

1.  **Synology NAS**: **Container Manager** (또는 Docker)가 설치되어 있어야 합니다.
2.  **SSH 접속**: Synology NAS에서 SSH가 활성화되어 있어야 합니다 (제어판 > 터미널 및 SNMP > SSH 서비스 활성화).
3.  **소스 코드**: Synology Drive를 통해 NAS에 소스 코드가 동기화되어 있어야 합니다.

## 배포 단계

### 1. Synology NAS에 SSH 접속

Mac 터미널을 열고 다음 명령어를 실행하세요:

```bash
ssh <사용자-ID>@<NAS-IP주소>
```
*`<사용자-ID>`와 `<NAS-IP주소>`를 실제 정보로 변경하세요.*

### 2. 프로젝트 폴더로 이동

Synology Drive 파일이 위치한 경로로 이동합니다. 보통 다음과 같습니다:

```bash
cd /volume1/homes/<사용자-ID>/Drive/homepage
```
*참고: NAS 설정에 따라 경로가 다를 수 있습니다. `ls` 명령어로 확인해보세요.*

### 3. 빌드 및 실행

다음 명령어를 실행하여 Docker 이미지를 빌드하고 컨테이너를 시작하세요:

```bash
sudo docker-compose up -d --build
```
*`sudo` 권한을 위해 비밀번호 입력이 필요할 수 있습니다.*

### 4. 배포 확인

명령어 실행이 완료되면 홈페이지가 실행됩니다.
브라우저에서 다음 주소로 접속해보세요:

```
http://<NAS-IP주소>:3000
```

### (대안) 방법 2: Container Manager (GUI) 사용

**주의**: 구형 **Docker** 패키지(DSM 7.1 이하)를 사용하는 경우, **프로젝트(Project)** 메뉴가 없을 수 있습니다. 이 경우 **방법 1 (SSH)**을 사용해야 합니다. 구형 Docker 앱은 소스 코드 빌드(`build: .`) 기능을 GUI에서 지원하지 않습니다.

1.  **Container Manager (또는 Docker) 실행**:
    *   **DSM 7.2 이상**: 이름이 **Container Manager**입니다.
    *   **DSM 7.1 이하**: 이름이 **Docker**입니다.
    *   *보이지 않는다면 '패키지 센터(Package Center)'에서 설치해야 합니다.*
2.  **프로젝트 생성**:
    *   왼쪽 메뉴에서 **프로젝트(Project)** > **생성(Create)** 클릭.
    *   **프로젝트 이름**: 예) `homepage`
    *   **경로**: `찾아보기`를 클릭하여 `homepage` 폴더(docker-compose.yml이 있는 곳)를 선택합니다.
    *   **소스**: "기존 docker-compose.yml을 사용하여 프로젝트 생성" 선택 (경로를 선택하면 자동 감지됨).
3.  **빌드 및 실행**:
    *   `다음`을 누르고 설정을 확인한 후 `완료`를 클릭합니다.
    *   Synology가 자동으로 이미지를 빌드하고 컨테이너를 실행합니다.
    *   처음 빌드 시 시간이 조금 걸릴 수 있습니다.

## 문제 해결

-   **포트 충돌**: 3000번 포트가 이미 사용 중이라면 `docker-compose.yml` 파일을 열어 포트를 변경하세요:
    ```yaml
    ports:
      - "3001:3000" # NAS의 3001 포트를 컨테이너의 3000 포트로 연결
    ```
-   **권한 문제**: 빌드 중 권한 오류가 발생하면 해당 폴더에 대한 읽기/쓰기 권한이 있는지 확인하세요.
-   **재배포**: 코드를 수정한 경우 `sudo docker-compose up -d --build` 명령어를 다시 실행하면 변경 사항이 적용됩니다.

## 설정 참고 사항
- **`next.config.ts`**: Docker 빌드 용량을 최적화하기 위해 `output: 'standalone'` 설정을 활성화했습니다.
- **`.dockerignore`**: 로컬 Mac의 `node_modules`가 NAS의 Linux 환경과 충돌하지 않도록 제외 설정했습니다.
