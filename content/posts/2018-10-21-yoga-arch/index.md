---
title: 'X1 YogaにArch Linuxを入れた話'
slug: yoga-arch
date: 2018-10-21
published: true
unlisted: false
language: ja
cover: ../2018-10-16-yoga/thinkpad3.jpg
imageShare: ../2018-10-16-yoga/thinkpad3.jpg
tags:
  - thinkpad
  - arch
---

どうも、よしかわです。先日、Yoga を購入しました。

もしよろしければ、こちらの記事もどうぞ。

[ThinkPad X1 Yoga のレビューをする](https://yoshikawa.dev/yoga/)

今回は Arch Linux を入れたので、メモ書き程度に綴っていきます。

### 方針

Windows10 と Arch Linux をデュアルブートする

### インストール前の準備

#### インストールメディアをつくる

[USB インストールメディア](https://wiki.archlinux.jp/index.php/USB_%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2)

- LENOVO ロゴの画面で Enter を押す
- Startup Interrupt Menu の画面で F1 を押す
- Secure Boot を無効にする
  - Security > Secure Boot
  - Secure Boot が Disabled であることを確認
- USB メモリの Linux の起動を最優先にする
  - ESC を押して、Startup ＞ Boot
  - USB メモリの Boot Priority Order を 1 番にする
- F10 (Save and Exit)を押して、Yes を選択する
- 再起動し、インストールメディアが起動する

### パーティションテーブルの作成

ブート、ルート、ホーム、スワップも一応作っておく。

僕の場合、nvme0n1p1 がブート領域。nvme0n1p3 が Windows の本体。

ぶっちゃけ、スワップ領域いらないかもしれないですね。

```shell
lsblk
NAME          SIZE RO TYPE MOUNTPOINT
nvme0n1       477G  0 disk
├─nvme0n1p1   260M  0 part /boot
├─nvme0n1p2    16M  0 part
├─nvme0n1p3 103.5G  0 part
├─nvme0n1p4    18G  0 part [SWAP]
├─nvme0n1p5   140G  0 part /
└─nvme0n1p6 215.2G  0 part /home
```

ext4 でフォーマットし、マウントする。

デバイスファイルをまちがえないように！！

```shell
mkfs.etx4 /dev/nvme0n1p5
mkfs.etx4 /dev/nvme0n1p6
mount /dev/nvme0n1p5 /mnt
mkdir /mnt/boot /mnt/home
mount /dev/nvme0n1p1 /mnt/boot
mount /dev/nvme0n1p6 /mnt/home
```

### システムのインストール

ArchWiki のインストールガイドにならって進めていきましょう。

```shell
wifi-menu
timedatectl set-ntp true
vim /etc/pacman.d/mirrorlist
pacstrap /mnt base base-devel zsh git dialog wpa_supplicant
genfstab -p /mnt >> /mnt/etc/fstab
```

ここからインストールしたシステムに切り替えて操作する。

```shell
arch-chroot /mnt
echo ThinkPad X1 Yoga > /etc/hostname
ln -s /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
vi /etc/locale.gen
locale-gen
echo LANG=en_US.UTF-8 > /etc/locale.conf
mkinitcpio -p linux
passwd
```

### ブートローダのインストール

grub を使おうと思っていたら、grub は NVMe に対応していないようでブート出来ない記事が多数見つかったため、以下のブートマネージャを使用。

[systemd-boot - ArchWiki](https://wiki.archlinux.jp/index.php/Systemd-boot)

systemd-boot は、systemd に同梱されている。

```shell
bootctl --path=/boot install
vi /boot/loader/loader.conf
# default  arch
# timeout  1
# editor  0
cp /usr/share/systemd/bootctl/arch.conf /boot/loader/entries/
pacman -S intel-ucode
# Intelのマイクロコード修正もここで入れておく
blkid -s PARTUUID -o value /dev/nvme0n1p4 >> /boot/loader/entries/arch.conf
# 手打ちは大変なので、rootパーティションのPARTUUIDを追記しておく
vi /boot/loader/entries/arch.conf
# title   Arch Linux
# linux   /vmlinuz-linux
# initrd  /intel-ucode.img
# initrd  /initramfs-linux.img
# options root=PARTUUID=hogehoge rw
```

これで Arch Linux のインストールが完了したので、再起動してみましょう！

```shell
exit
umount -R /mnt
reboot
```

### 参考資料

[Thinkpad X1 Carbon (Gen 4)に Arch Linux をインストールする](https://qiita.com/miy4/items/796c51813417cc90c77f)

[ThinkPad X1 Carbon に Arch Linux をインストールした](https://muryoimpl.com/blog/2016/11/09/install-arch-linux-to-thinkpad-x1-carbon/)

[X1 Carbon 2016(Gen 4)に Arch Linux をインストール](https://pocke.hatenablog.com/entry/2016/06/18/180914)

[VAIO Z で Arch Linux と Windows 10 をデュアルブートする](https://qiita.com/mopp/items/f1912433abbed69f5f99)
