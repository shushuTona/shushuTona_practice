# CentOS 7.8
FROM centos:7
RUN yum update -y && yum clean all

# Repository
# EPEL
RUN yum install -y epel-release
# remi
RUN yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

# Install apache
RUN yum install -y httpd

# Install PHP
RUN yum -y install --enablerepo=remi,remi-php74 php php-devel php-mbstring php-pdo php-xml php-gd php-fpm php-mysqlnd php-opcache php-pecl-zip libzip5

RUN yum -y install nodejs

WORKDIR /var/www/html

# Port
EXPOSE 80

# Httpd start
ENTRYPOINT ["/usr/sbin/httpd", "-DFOREGROUND"]
