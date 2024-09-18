﻿// <auto-generated />
using System;
using DealMatchup.MockContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DealMatchup.MockContext.Migrations
{
    [DbContext(typeof(DealMatchupContext))]
    [Migration("20240507162611_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DealMatchup.Repository.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Parent_CategoryId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Parent_CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date_of_sharing")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Shared_Item_Id")
                        .HasColumnType("int");

                    b.Property<int>("User_Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Shared_Item_Id");

                    b.HasIndex("User_Id");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.History", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateOpen")
                        .HasColumnType("datetime2");

                    b.Property<int>("Shared_Item_Id")
                        .HasColumnType("int");

                    b.Property<int>("User_Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Shared_Item_Id");

                    b.HasIndex("User_Id");

                    b.ToTable("History");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Key_Word", b =>
                {
                    b.Property<int>("Key_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Key_Id"));

                    b.Property<int>("Category_Id")
                        .HasColumnType("int");

                    b.Property<string>("Key_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Num_Occurs")
                        .HasColumnType("int");

                    b.HasKey("Key_Id");

                    b.HasIndex("Category_Id");

                    b.ToTable("Key_Words");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Shared_Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Category_Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date_of_sharing")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("Type_Id")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("User_Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Category_Id");

                    b.HasIndex("Type_Id");

                    b.HasIndex("User_Id");

                    b.ToTable("SharedItems");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Types", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Types");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Category", b =>
                {
                    b.HasOne("DealMatchup.Repository.Entities.Category", "Parent_Category")
                        .WithMany()
                        .HasForeignKey("Parent_CategoryId");

                    b.Navigation("Parent_Category");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Comment", b =>
                {
                    b.HasOne("DealMatchup.Repository.Entities.Shared_Item", "Shared_Item")
                        .WithMany("Comments")
                        .HasForeignKey("Shared_Item_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DealMatchup.Repository.Entities.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("User_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Shared_Item");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.History", b =>
                {
                    b.HasOne("DealMatchup.Repository.Entities.Shared_Item", "Shared_Item")
                        .WithMany()
                        .HasForeignKey("Shared_Item_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DealMatchup.Repository.Entities.User", "User")
                        .WithMany("History")
                        .HasForeignKey("User_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Shared_Item");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Key_Word", b =>
                {
                    b.HasOne("DealMatchup.Repository.Entities.Category", "Category")
                        .WithMany("Key_Words")
                        .HasForeignKey("Category_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Shared_Item", b =>
                {
                    b.HasOne("DealMatchup.Repository.Entities.Category", "Category")
                        .WithMany("Shared_Items")
                        .HasForeignKey("Category_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DealMatchup.Repository.Entities.Types", "Type")
                        .WithMany("Shared_Items")
                        .HasForeignKey("Type_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DealMatchup.Repository.Entities.User", "User")
                        .WithMany("Shared_Items")
                        .HasForeignKey("User_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Type");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Category", b =>
                {
                    b.Navigation("Key_Words");

                    b.Navigation("Shared_Items");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Shared_Item", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.Types", b =>
                {
                    b.Navigation("Shared_Items");
                });

            modelBuilder.Entity("DealMatchup.Repository.Entities.User", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("History");

                    b.Navigation("Shared_Items");
                });
#pragma warning restore 612, 618
        }
    }
}
