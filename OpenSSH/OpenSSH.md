`Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'`
`Get-Service sshd`
`Start-Service sshd`
`Set-Service -Name sshd -StartupType 'Automatic'
`ssh username@192.168.xxx.xxx`

linux의 경우 `/home/user/.ssh/authorized_keys` 경로에 공개키를 보관한다.
